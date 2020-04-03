import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ApolloClient, {
  InMemoryCache,
  ApolloLink,
  Observable
} from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import GlobalState from "./Contexts/GlobalState";
import Routing from "./components/Routing/Routing";
import ApiSetup from "./ApiSetup";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

ReactDOM.render(
  <React.StrictMode>
    <GlobalState>
      <ApiSetup>
        <Routing />
      </ApiSetup>
    </GlobalState>
  </React.StrictMode>,
  document.getElementById("root")
);
