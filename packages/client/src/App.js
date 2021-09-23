import React, { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
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
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import OnlyPublicRoute from "./components/OnlyPublicRoute/OnlyPublicRoute";

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
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path={PUBLIC.USER_ACCOUNT}>
          <Account />
        </PrivateRoute>
        <OnlyPublicRoute path={PUBLIC.SIGN_UP}>
          <SignUp />
        </OnlyPublicRoute>
        <OnlyPublicRoute path={PUBLIC.SIGN_IN}>
          <SignIn />
        </OnlyPublicRoute>
        {/* <Route path={PUBLIC.RESET_PASSWORD}>
          <ResetPassword />
        </Route> */}
        <PrivateRoute path={PUBLIC.HOME}>
          <Home />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
