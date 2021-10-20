import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { PUBLIC } from "../../constants/routes";

const OnlyPublicRoute = ({ children, ...rest }) => {
  const userState = useSelector((state) => state.user);
  const history = useHistory();
  const urlDestination = history.location.state
    ? history.location.state.referrer
    : PUBLIC.HOME;

  return (
    <Route {...rest}>
      {!userState.isLogged ? children : <Redirect to={urlDestination} />}
    </Route>
  );
};

export default OnlyPublicRoute;
