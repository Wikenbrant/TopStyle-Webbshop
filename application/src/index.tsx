import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GlobalState from "./Contexts/GlobalState";
import Routing from "./components/Routing/Routing";
import ApiSetup from "./ApiSetup";
import TokenState from "./Contexts/TokenState";

ReactDOM.render(
  <TokenState>
    <ApiSetup>
      <GlobalState>
        <Routing />
      </GlobalState>
    </ApiSetup>
  </TokenState>,
  document.getElementById("root")
);
