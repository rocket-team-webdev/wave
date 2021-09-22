import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PUBLIC } from "./constants/routes";
import Home from "./pages/Public/Home";
import SignUp from "./pages/Public/SignUp";

import Button from "./components/Button";
import Input from "./components/Input";

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
      <div>
        <Button>Primary button</Button>
        <Button secondaryBtn>Secondary button</Button>
        <Button isNegative>Secondary button</Button>
        <Button isNegative secondaryBtn>
          Secondary button
        </Button>
        <Button isSmall>Secondary button</Button>
        <Input
          label="hey"
          id="aloha"
          type="password"
          placeholder="This is a placeholder"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
