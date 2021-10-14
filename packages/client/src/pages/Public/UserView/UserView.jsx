/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "../../../components/Layout";
import HomeElement from "../../../components/HomeElement";
// import GenreCard from "../../../components/GenreCard";
import PlaylistList from "../../../components/PlaylistList";
import TrackList from "../../../components/TrackList";
import UserCard from "../../../components/UserCard";
import AlbumCard from "../../../components/AlbumCard";
import Spinner from "../../../components/Spinner";

import "./UserView.scss";

import { PUBLIC } from "../../../constants/routes";
import {
  getUserById,
  getUserFollowers,
  getUserFollowings,
  getUserPlaylists,
  getUserFollowingPlaylists,
  getUserAlbums,
  getUserTracks,
  getUserLikedTracks,
} from "../../../api/users-api";

export default function UserView() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [userFollowingPlaylists, setUserFollowingPlaylists] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);
  const [userTracks, setUserTracks] = useState([]);
  const [userLikedTracks, setUserLikedTracks] = useState([]);

  const { userId } = useRouteMatch(`${PUBLIC.USERS}/:userId`).params;

  // General

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserById(userId);
      setUser(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  // Users

  const loadUserFollowers = async () => {
    setIsLoading(false);
    try {
      const { data } = await getUserFollowers(userId);
      setUserFollowers(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  const loadUserFollowings = async () => {
    setIsLoading(false);
    try {
      const { data } = await getUserFollowings(userId);
      setUserFollowings(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  // Playlists

  const loadUserPlaylists = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserPlaylists(userId);
      setUserPlaylists(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  const loadUserFollowingPlaylists = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserFollowingPlaylists(userId);
      setUserFollowingPlaylists(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  // Albums

  const loadUserAlbums = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserAlbums(userId);
      setUserAlbums(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  // Tracks
  const loadUserTracks = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserTracks(userId);
      setUserTracks(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };
  const loadUserLikedTracks = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserLikedTracks(userId);
      setUserLikedTracks(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // General
    loadUser();
    // Users
    loadUserFollowers();
    loadUserFollowings();
    // Playlists
    loadUserPlaylists();
    loadUserFollowingPlaylists();
    // Albums
    loadUserAlbums();
    // Tracks
    loadUserTracks();
    loadUserLikedTracks();
  }, []);

  return (
    <Layout isNegative>
      <div className="row p-0 g-4">
        <div className="col col-12 ps-0">
          <div className="user-top d-flex justify-content-between">
            {/* Username */}
            <h1 className="fnt-page-title mb-5 truncate">{`${user.firstName} ${user.lastName}`}</h1>
            <img
              className="user-profile-picture fx-rounded"
              src={user.profilePicture}
              alt={user.firstName}
            />
          </div>
          {/* Bottom */}
          <div className="user-bottom row p-0 mt-4">
            {/* Bottom left */}
            <div className="col col-12 col-md-10 bottom-left row p-0 m-0 gx-4 gy-5">
              {/* User playlists */}
              {!isLoading ? (
                userPlaylists.length > 0 && (
                  <HomeElement
                    label="Created playlists"
                    cols="6"
                    isAnimationContainer
                  >
                    <PlaylistList
                      playlists={userPlaylists}
                      onAddFollowedColumn={() => {}}
                    />
                  </HomeElement>
                )
              ) : (
                <HomeElement label="Created playlists">
                  <Spinner isNegative />
                </HomeElement>
              )}
              {/* User following playlists */}
              {!isLoading ? (
                userFollowingPlaylists.length > 0 && (
                  <HomeElement
                    label="Following playlists"
                    cols="6"
                    isAnimationContainer
                  >
                    <PlaylistList
                      playlists={userFollowingPlaylists}
                      onAddFollowedColumn={() => {}}
                    />
                  </HomeElement>
                )
              ) : (
                <HomeElement label="Following playlists">
                  <Spinner isNegative />
                </HomeElement>
              )}
              {/* User tracks */}
              {!isLoading ? (
                userTracks.length > 0 && (
                  <HomeElement
                    label="Uploaded tracks"
                    cols="6"
                    isAnimationContainer
                  >
                    <TrackList tracks={userTracks} setTrakcs={setUserTracks} />
                  </HomeElement>
                )
              ) : (
                <HomeElement label="Uploaded tracks">
                  <Spinner isNegative />
                </HomeElement>
              )}
              {/* User liked tracks */}
              {!isLoading ? (
                userLikedTracks.length > 0 && (
                  <HomeElement
                    label="Liked tracks"
                    cols="6"
                    isAnimationContainer
                  >
                    <TrackList
                      tracks={userLikedTracks}
                      setTrakcs={setUserLikedTracks}
                    />
                  </HomeElement>
                )
              ) : (
                <HomeElement label="Liked tracks">
                  <Spinner isNegative />
                </HomeElement>
              )}
            </div>
            {/* Bottom right */}
            <div className="bottom-right col col-12 col-md-2 row p-0 m-0 gx-4 gy-5 h-fit-content">
              {/* User albums */}
              {userAlbums.length > 0 && (
                <HomeElement label="Followers" cols="12" isAnimationContainer>
                  {userAlbums.map((album) => (
                    <AlbumCard
                      key={album._id}
                      albumId={album._id}
                      albumTitle={album.title}
                    />
                  ))}
                </HomeElement>
              )}
              {/* User followers */}
              {userFollowers.length > 0 && (
                <HomeElement label="Followers" cols="12" isAnimationContainer>
                  {userFollowers.map((following) => (
                    <UserCard
                      key={following._id}
                      userId={following._id}
                      userName={following.firstName}
                    />
                  ))}
                </HomeElement>
              )}
              {/* User following */}
              {userFollowings.length > 0 && (
                <HomeElement label="Following" cols="12" isAnimationContainer>
                  {userFollowings.map((following) => (
                    <UserCard
                      key={following._id}
                      userId={following._id}
                      userName={following.firstName}
                    />
                  ))}
                </HomeElement>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
