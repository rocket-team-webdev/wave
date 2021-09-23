import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PUBLIC } from "../../constants/routes";

const OnlyPublicRoute = ({ children, ...rest }) => {
  const userState = useSelector((state) => state.user);

  return (
    <Route {...rest}>
      {!userState.isLogged ? children : <Redirect to={PUBLIC.HOME} />}
    </Route>
  );
};

export default OnlyPublicRoute;
