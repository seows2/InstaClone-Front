import PropTypes from "prop-types";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth/index";
import Feed from "../Routes/Feed";

const LoggedInRoutes = () => <Route exact path="/" component={Feed} />;
const LoggedOutRoutes = () => <Route exact path="/" component={Auth} />;
const Router = ({ isLoggedIn }) => (
  <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
);

Router.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default Router;
