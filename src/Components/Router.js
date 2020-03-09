import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";

const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={Feed} />
  </>
);
const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Auth} />
  </>
);
const Router = ({ isLoggedIn }) => (
  <BrowserRouter>
    <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
  </BrowserRouter>
);

Router.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default Router;
