import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import GlobalState from "./Contexts/GlobalState";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalState>
        <App />
      </GlobalState>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
