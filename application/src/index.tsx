import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GlobalState from "./Contexts/GlobalState";
import Routing from "./components/Routing/Routing";
import ApiSetup from "./ApiSetup";

ReactDOM.render(
  <GlobalState>
    <ApiSetup>
      <Routing />
    </ApiSetup>
  </GlobalState>,
  document.getElementById("root")
);
