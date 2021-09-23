import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PUBLIC } from "./constants/routes";
import Home from "./pages/Public/Home";
import SignUp from "./pages/Public/SignUp";
import SignIn from "./pages/Public/SignIn";
import UpdatePassword from "./pages/Public/UpdatePassword";
import ResetPassword from "./pages/Public/ResetPassword/ResetPassword";
import Account from "./pages/Public/Account";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PUBLIC.UPDATE_PASSWORD}>
          <UpdatePassword />
        </Route>
        <Route path={PUBLIC.RESET_PASSWORD}>
          <ResetPassword />
        </Route>
        <Route path={PUBLIC.USER_ACCOUNT}>
          <Account />
        </Route>
        <Route path={PUBLIC.SIGN_UP}>
          <SignUp />
        </Route>
        <Route path={PUBLIC.SIGN_IN}>
          <SignIn />
        </Route>
        <Route path={PUBLIC.HOME}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
