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
import UserView from "../../pages/Public/UserView";
import Reauthenticate from "../../pages/Public/Reauthenticate";
import ResetPassword from "../../pages/Public/ResetPassword";
import TrackUpdate from "../../pages/Public/TrackUpdate";
import TrackUpload from "../../pages/Public/TrackUpload";
import Tracks from "../../pages/Public/Tracks";
import CreateAlbum from "../../pages/Public/CreateAlbum";
import MyPlaylists from "../../pages/Public/MyPlaylists/MyPlaylists";
import CreatePlaylist from "../../pages/Public/CreatePlaylist";
import SinglePlaylist from "../../pages/Public/SinglePlaylist";
import Album from "../../pages/Public/Album";
import UpdateAlbum from "../../pages/Public/UpdateAlbum";
import PlaylistUpdate from "../../pages/Public/PlaylistUpdate/PlaylistUpdate";
import NotFound from "../../pages/Public/NotFound";

export default function Router() {
  return (
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
        <PrivateRoute path={PUBLIC.USER_VIEW}>
          <UserView />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.USER_ACCOUNT} exact>
          <Account />
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
  );
}
