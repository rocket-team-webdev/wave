import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PUBLIC, PRIVATE } from "./constants/routes";
import Home from "./pages/Public/Home";
import SignUp from "./pages/Public/SignUp";
import SignIn from "./pages/Public/SignIn";
import Account from "./pages/Private/Account";
import ResetPassword from "./pages/Public/ResetPassword/ResetPassword";
import { onAuthStateChanged } from "./services/auth";
import { logIn } from "./redux/user/actions";

function App() {
  const dispatch = useDispatch();
  // const userState = useSelector((state) => state.user);

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        dispatch(
          logIn({
            email: user.email,
            token: "",
            firstName: "",
            lastName: "",
            profilePicture: user.uid,
            firebaseId: "",
            isLogged: false,
          }),
        );
      } else {
        console.log("no user");
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PRIVATE.USER_ACCOUNT}>
          <Account />
        </Route>
        <Route path={PUBLIC.SIGN_UP}>
          <SignUp />
        </Route>
        <Route path={PUBLIC.SIGN_IN}>
          <SignIn />
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
