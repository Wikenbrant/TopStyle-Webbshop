import React, { useContext } from "react";
import {
  InMemoryCache,
  ApolloLink,
  Observable,
  ApolloClient,
  HttpLink
} from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import TokenContext from "./Contexts/TokenContext";

const ApiSetup: React.FC = ({ children }) => {
  const { SetAccessToken, GetAccessToken } = useContext(TokenContext);
  const cache = new InMemoryCache();

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle: ZenObservable.Subscription;
        Promise.resolve(operation)
          .then(operation => {
            const accessToken = GetAccessToken();
            if (accessToken) {
              operation.setContext({
                headers: {
                  authorization: `bearer ${accessToken}`
                }
              });
            }
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

  const client = new ApolloClient({
    link: ApolloLink.from([
      new TokenRefreshLink({
        accessTokenField: "accessToken",
        isTokenValidOrUndefined: () => {
          const token = GetAccessToken();

          if (!token) {
            return true;
          }

          try {
            const { exp } = jwtDecode(token);
            if (Date.now() >= exp * 1000) {
              return false;
            } else {
              return true;
            }
          } catch {
            return false;
          }
        },
        fetchAccessToken: () => {
          return fetch("http://localhost:4000/refresh_token", {
            method: "POST",
            credentials: "include"
          });
        },
        handleFetch: accessToken => {
          SetAccessToken(accessToken);
        },
        handleError: err => {
          console.warn("Your refresh token is invalid. Try to relogin");
          console.error(err);
        }
      }),
      requestLink,
      new HttpLink({
        uri: "http://localhost:4000/graphql",
        credentials: "include"
      })
    ]),
    cache
  });

  return <ApolloProvider client={client}> {children}</ApolloProvider>;
};

export default ApiSetup;
