import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PUBLIC } from "./constants/routes";
import { onAuthStateChanged, getCurrentUser } from "./services/auth";
import { logIn } from "./redux/user/actions";
import { signInUserData } from "./api/account-api";
import { on } from "./utils/customEvents";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import OnlyPublicRoute from "./components/OnlyPublicRoute/OnlyPublicRoute";
import Home from "./pages/Public/Home";
import SignUp from "./pages/Public/SignUp";
import UpdatePassword from "./pages/Public/UpdatePassword";
import SignIn from "./pages/Public/SignIn";
import Account from "./pages/Public/Account/Account";
import Reauthenticate from "./pages/Public/Reauthenticate";
import ResetPassword from "./pages/Public/ResetPassword";
import TrackUpload from "./pages/Public/TrackUpload";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const userState = useSelector((state) => state.user);

  async function handleExistingUser(firebaseUser) {
    const token = firebaseUser.multiFactor.user.accessToken;
    const dbUser = (await signInUserData(token)).data.data;

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
    setLoading(false);
  }

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user && user.emailVerified && !userState.isRegistering) {
        handleExistingUser(user);
      } else {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    on("setLoginReduxState", () => {
      const firebaseUser = getCurrentUser();
      handleExistingUser(firebaseUser);
    });
  });

  return (
    <>
      {!loading && (
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path={PUBLIC.USER_ACCOUNT}>
              <Account />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.UPDATE_PASSWORD}>
              <UpdatePassword />
            </PrivateRoute>
            <OnlyPublicRoute path={PUBLIC.RESET_PASSWORD}>
              <ResetPassword />
            </OnlyPublicRoute>
            <PrivateRoute path={PUBLIC.REAUTHENTICATE}>
              <Reauthenticate />
            </PrivateRoute>
            <OnlyPublicRoute path={PUBLIC.SIGN_UP}>
              <SignUp />
            </OnlyPublicRoute>
            <OnlyPublicRoute path={PUBLIC.SIGN_IN}>
              <SignIn />
            </OnlyPublicRoute>
            <PrivateRoute path={PUBLIC.TRACK_UPLOAD}>
              <TrackUpload />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.HOME}>
              <Home />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      )}
      <MusicPlayer />

      <ToastContainer draggable theme="colored" />
    </>
  );
}

export default App;
