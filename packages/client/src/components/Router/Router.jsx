import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { PUBLIC } from "../../constants/routes";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MusicPlayer from "../MusicPlayer";
import OnlyPublicRoute from "../OnlyPublicRoute/OnlyPublicRoute";

import Home from "../../pages/Public/Home";
import SignUp from "../../pages/Public/SignUp";
import UpdatePassword from "../../pages/Public/UpdatePassword";
import SignIn from "../../pages/Public/SignIn";
import Account from "../../pages/Public/Account/Account";
import Reauthenticate from "../../pages/Public/Reauthenticate";
import ResetPassword from "../../pages/Public/ResetPassword";
import TrackUpdate from "../../pages/Public/TrackUpdate";
import TrackUpload from "../../pages/Public/TrackUpload";
import Tracks from "../../pages/Public/Tracks";
import CreateAlbum from "../../pages/Public/CreateAlbum";
import MyPlaylists from "../../pages/Public/MyPlaylists/MyPlaylists";
import CreatePlaylist from "../../pages/Public/CreatePlaylist";
import SinglePlaylist from "../../pages/Public/SinglePlaylist";
import PlaylistUpdate from "../../pages/Public/PlaylistUpdate/PlaylistUpdate";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path={PUBLIC.UPDATE_PASSWORD}>
          <UpdatePassword />
        </PrivateRoute>
        <OnlyPublicRoute path={PUBLIC.RESET_PASSWORD}>
          <ResetPassword />
        </OnlyPublicRoute>
        <PrivateRoute path={PUBLIC.TRACK_UPLOAD}>
          <TrackUpload />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.TRACK_UPDATE}>
          <TrackUpdate />
        </PrivateRoute>
        <PrivateRoute exact path={PUBLIC.USER_ACCOUNT}>
          <Account />
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
        <PrivateRoute path={PUBLIC.ADD_ALBUM}>
          <CreateAlbum />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.ADD_PLAYLIST}>
          <CreatePlaylist />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.MY_PLAYLISTS}>
          <MyPlaylists />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.MY_SONGS}>
          <Tracks />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.PLAYLIST_UPDATE}>
          <PlaylistUpdate />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.SINGLE_PLAYLIST}>
          <SinglePlaylist />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.HOME}>
          <Home />
        </PrivateRoute>
      </Switch>
      <MusicPlayer />
    </BrowserRouter>
  );
}
