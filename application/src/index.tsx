import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import GlobalState from "./Contexts/GlobalState";
import Routing from "./components/Routing/Routing";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalState>
        <Routing />
      </GlobalState>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
