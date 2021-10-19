import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

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
import Queue from "../../pages/Public/Queue";
import UpdateAlbum from "../../pages/Public/UpdateAlbum";
import PlaylistUpdate from "../../pages/Public/PlaylistUpdate";
import NotFound from "../../pages/Public/NotFound";
import MyAlbums from "../../pages/Public/MyAlbums/MyAlbums";
import UserPlaylists from "../../pages/Public/UserPlaylists";
import UserAlbums from "../../pages/Public/UserAlbums";
import UserTracks from "../../pages/Public/UserTracks";
import PopularPlaylists from "../../pages/Public/PopularPlaylists";
import PopularTracks from "../../pages/Public/PopularTracks";
import PopularAlbums from "../../pages/Public/PopularAlbums";
import Search from "../../pages/Public/Search";
import AppStats from "../../pages/Public/AppStats";

export default function Router() {
  const queueState = useSelector((state) => state.queue);
  const userState = useSelector((state) => state.user);
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
        <PrivateRoute path={PUBLIC.QUEUE} exact>
          <Queue />
        </PrivateRoute>
        <PrivateRoute path={`${PUBLIC.USER_VIEW}/:id`} exact>
          <UserView />
        </PrivateRoute>
        <PrivateRoute path={`${PUBLIC.USER_VIEW}/:id${PUBLIC.PLAYLISTS}`} exact>
          <UserPlaylists />
        </PrivateRoute>
        <PrivateRoute path={`${PUBLIC.USER_VIEW}/:id${PUBLIC.ALBUMS}`} exact>
          <UserAlbums />
        </PrivateRoute>
        <PrivateRoute path={`${PUBLIC.USER_VIEW}/:id${PUBLIC.TRACKS}`} exact>
          <UserTracks />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.USER_ACCOUNT} exact>
          <Account />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.APP_STATS} exact>
          <AppStats />
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
        <PrivateRoute path={PUBLIC.ALBUMS}>
          <MyAlbums />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.ALBUM}>
          <Album />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.PLAYLIST_UPDATE}>
          <PlaylistUpdate />
        </PrivateRoute>
        <PrivateRoute path={`${PUBLIC.SINGLE_PLAYLIST}/:id`} exact>
          <SinglePlaylist />
        </PrivateRoute>
        <PrivateRoute path={`${PUBLIC.POPULAR}${PUBLIC.PLAYLISTS}`} exact>
          <PopularPlaylists />
        </PrivateRoute>
        <PrivateRoute path={`${PUBLIC.POPULAR}${PUBLIC.TRACKS}`} exact>
          <PopularTracks />
        </PrivateRoute>
        <PrivateRoute path={`${PUBLIC.POPULAR}${PUBLIC.ALBUMS}`} exact>
          <PopularAlbums />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.SEARCH} exact>
          <Search />
        </PrivateRoute>
        <PrivateRoute path={PUBLIC.HOME} exact>
          <Home />
        </PrivateRoute>
        <PrivateRoute path="*">
          <NotFound />
        </PrivateRoute>
      </Switch>
      {queueState.queue.length > 0 && userState.isLogged && <MusicPlayer />}
    </BrowserRouter>
  );
}
