import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PUBLIC } from "./constants/routes";
import Home from "./pages/Public/Home";
import SignUp from "./pages/Public/SignUp";
import SignIn from "./pages/Public/SignIn";
import Account from "./pages/Public/Account";
// import ResetPassword from "./pages/Public/ResetPassword/ResetPassword";
import { onAuthStateChanged } from "./services/auth";
import { logIn } from "./redux/user/actions";
import { signInUserData } from "./api/account-api";

function App() {
  const dispatch = useDispatch();
  // const userState = useSelector((state) => state.user);
  async function handleExistingUser(firebaseUser) {
    const token = firebaseUser.multiFactor.user.accessToken;
    const dbUser = await (await signInUserData(token)).data.data;
    dispatch(
      logIn({
        email: firebaseUser.email,
        token: firebaseUser.multiFactor.user.accessToken,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        profilePicture: dbUser.profilePicture || "",
        firebaseId: firebaseUser.uid,
        isLogged: true,
      }),
    );
  }
  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        handleExistingUser(user);
      } else {
        console.log("no user");
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PUBLIC.USER_ACCOUNT}>
          <Account />
        </Route>
        <Route path={PUBLIC.SIGN_UP}>
          <SignUp />
        </Route>
        <Route path={PUBLIC.SIGN_IN}>
          <SignIn />
        </Route>
        {/* <Route path={PUBLIC.RESET_PASSWORD}>
          <ResetPassword />
        </Route> */}
        <Route path={PUBLIC.HOME}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
