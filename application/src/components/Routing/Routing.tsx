import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import App from "../../App";
import LandingPage from "../../views/LandingPage/LandingPage";
import Layout from "../../Layout";

var history = createBrowserHistory();

const Routing: React.FC = () => {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routing;
