import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { PUBLIC } from "../../constants/routes";

const PrivateRoute = ({ children, ...rest }) => {
  const userState = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <Route {...rest}>
      {userState.isLogged ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: PUBLIC.SIGN_IN,
            state: { referrer: location.pathname },
          }}
        />
      )}
    </Route>
  );
};

export default PrivateRoute;
