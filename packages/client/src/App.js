import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PUBLIC, PRIVATE } from "./constants/routes";

import Home from "./pages/Public/Home";
import SignUp from "./pages/Public/SignUp";
import Account from "./pages/Private/Account";
import ResetPassword from "./pages/Public/ResetPassword/ResetPassword";

// import Button from "./components/Button";
// import Input from "./components/Input";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PRIVATE.USER_ACCOUNT}>
          <Account />
        </Route>
        <Route path={PUBLIC.SIGNUP}>
          <SignUp />
        </Route>
        <Route path={PUBLIC.SIGNUP}>
          <SignUp />
        </Route>
        <Route path={PUBLIC.RESET_PASSWORD}>
          <ResetPassword />
        </Route>
        <Route path={PUBLIC.HOME}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
