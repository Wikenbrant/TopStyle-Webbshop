import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import LandingPage from "../../views/LandingPage/LandingPage";
import Layout from "../../Layout";
import LoginPage from "../../views/LoginPage/LoginPage";
import RegisterPage from "../../views/RegisterPage/RegisterPage";
import Checkout from "../../views/Checkout/Checkout";

var history = createBrowserHistory();

const Routing: React.FC = () => {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route path="/Login">
            <LoginPage />
          </Route>
          <Route path="/Register">
            <RegisterPage />
          </Route>
          <Route path="/Order/:id">
            <Checkout />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routing;
