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
import UserView from "./pages/Public/UserView";

import TrackUpdate from "./pages/Public/TrackUpdate";
import TrackUpload from "./pages/Public/TrackUpload";
import Tracks from "./pages/Public/Tracks";
import MusicPlayer from "./components/MusicPlayer";
import CreateAlbum from "./pages/Public/CreateAlbum";
import MyPlaylists from "./pages/Public/MyPlaylists/MyPlaylists";
import CreatePlaylist from "./pages/Public/CreatePlaylist";
import SinglePlaylist from "./pages/Public/SinglePlaylist";
import Album from "./pages/Public/Album";
import UpdateAlbum from "./pages/Public/UpdateAlbum";
import PlaylistUpdate from "./pages/Public/PlaylistUpdate/PlaylistUpdate";
import NotFound from "./pages/Public/NotFound";

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
            <PrivateRoute path={PUBLIC.UPDATE_PASSWORD} exact>
              <UpdatePassword />
            </PrivateRoute>
            <OnlyPublicRoute path={PUBLIC.RESET_PASSWORD} exact>
              <ResetPassword />
            </OnlyPublicRoute>
            <PrivateRoute path={PUBLIC.TRACK_UPLOAD} exact>
              <TrackUpload />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.TRACK_UPDATE}>
              <TrackUpdate />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.USER_ACCOUNT} exact>
              <Account />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.USER_VIEW}>
              <UserView />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.REAUTHENTICATE} exact>
              <Reauthenticate />
            </PrivateRoute>
            <OnlyPublicRoute path={PUBLIC.SIGN_UP} exact>
              <SignUp />
            </OnlyPublicRoute>
            <OnlyPublicRoute path={PUBLIC.SIGN_IN} exact>
              <SignIn />
            </OnlyPublicRoute>
            <PrivateRoute path={PUBLIC.ADD_ALBUM} exact>
              <CreateAlbum />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.UPDATE_ALBUM}>
              <UpdateAlbum />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.ADD_PLAYLIST} exact>
              <CreatePlaylist />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.MY_PLAYLISTS} exact>
              <MyPlaylists />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.MY_SONGS} exact>
              <Tracks />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.ALBUM}>
              <Album />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.PLAYLIST_UPDATE}>
              <PlaylistUpdate />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.SINGLE_PLAYLIST}>
              <SinglePlaylist />
            </PrivateRoute>
            <PrivateRoute path={PUBLIC.HOME} exact>
              <Home />
            </PrivateRoute>
            <PrivateRoute path="*">
              <NotFound />
            </PrivateRoute>
          </Switch>
          <MusicPlayer />
        </BrowserRouter>
      )}
      <ToastContainer draggable theme="colored" />
    </>
  );
}

export default App;
