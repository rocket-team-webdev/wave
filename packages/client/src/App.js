import React, { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PUBLIC } from "./constants/routes";
import { onAuthStateChanged } from "./services/auth";
import { logIn } from "./redux/user/actions";
import { signInUserData } from "./api/account-api";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import OnlyPublicRoute from "./components/OnlyPublicRoute/OnlyPublicRoute";
import Home from "./pages/Public/Home";
import SignUp from "./pages/Public/SignUp";
import UpdatePassword from "./pages/Public/UpdatePassword";
import SignIn from "./pages/Public/SignIn";
import Account from "./pages/Public/Account/Account";
import Reauthenticate from "./pages/Public/Reauthenticate";
import ResetPassword from "./pages/Public/ResetPassword";

function App() {
  const dispatch = useDispatch();
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
        mongoId: dbUser._id,
      }),
    );
  }
  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        handleExistingUser(user);
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path={PUBLIC.USER_ACCOUNT}>
          <Account />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.UPDATE_PASSWORD}>
          <UpdatePassword />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.RESET_PASSWORD}>
          <ResetPassword />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.REAUTHENTICATE}>
          <Reauthenticate />
        </PrivateRoute>
        <OnlyPublicRoute path={PUBLIC.SIGN_UP}>
          <SignUp />
        </OnlyPublicRoute>
        <OnlyPublicRoute path={PUBLIC.SIGN_IN}>
          <SignIn />
        </OnlyPublicRoute>
        <PrivateRoute path={PUBLIC.HOME}>
          <Home />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
