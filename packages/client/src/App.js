import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PUBLIC } from "./constants/routes";
import Home from "./pages/Public/Home";
import SignUp from "./pages/Public/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PUBLIC.SIGNUP}>
          <SignUp />
        </Route>
        <Route path={PUBLIC.HOME}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
