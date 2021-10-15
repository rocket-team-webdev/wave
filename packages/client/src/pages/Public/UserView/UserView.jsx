/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { fromBottom } from "../../../utils/motionSettings";

import Layout from "../../../components/Layout";
import HomeElement from "../../../components/HomeElement";
import PlaylistList from "../../../components/PlaylistList";
import TrackList from "../../../components/TrackList";
import GenreCard from "../../../components/GenreCard";
import AlbumCard from "../../../components/AlbumCard";
import UserCard from "../../../components/UserCard";
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

// TODO get user genres
import { getAllGenres } from "../../../api/genre-api";
import { uniqueValuesArray } from "../../../utils/arrayFunctions";

export default function UserView() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [userGenres, setUserGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [userFollowingPlaylists, setUserFollowingPlaylists] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);
  const [userTracks, setUserTracks] = useState([]);
  const [userLikedTracks, setUserLikedTracks] = useState([]);
  const history = useHistory();

  const { userId } = useRouteMatch(`${PUBLIC.USERS}/:userId`).params;

  const location = useLocation();

  // General
  const loadUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserById(userId);
      setUser(data.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 500) {
        toast("User not found", {
          type: "error",
        });
        history.push(PUBLIC.NOT_FOUND);
      } else {
        toast(error.message, { type: "error" });
      }
    }
  };

  // Genres
  const getUserGenresFromTracks = (tracksArray) => {
    const genresArray = [];
    tracksArray.map((track) => {
      const foundUserGenre = allGenres.filter(
        (genre) => genre._id === track.genreId,
      );
      genresArray.push(...foundUserGenre);
      return genresArray;
    });
    const cleanedGenres = uniqueValuesArray(genresArray);
    setUserGenres(cleanedGenres);
  };

  const loadUserGenres = () => {
    const allTracks = [];
    userTracks.map((track) => allTracks.push(track));
    userLikedTracks.map((track) => allTracks.push(track));
    getUserGenresFromTracks(allTracks);
  };

  const loadAllGenres = async () => {
    setIsLoading(true);
    try {
      const { data } = await getAllGenres();
      setAllGenres(data.genres);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  // Users

  const loadUserFollowers = async () => {
    setIsLoading(true);
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
    setIsLoading(true);
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
    // Genres
    loadAllGenres();
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

  useEffect(() => {
    // General
    loadUser();
    // Genres
    loadAllGenres();
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
  }, [location.pathname]);

  useEffect(() => {
    loadUserGenres();
  }, [userTracks, userLikedTracks]);

  return (
    <Layout isNegative>
      <div className="row p-0 g-4">
        <div className="col col-12 ps-0">
          <div className="user-top d-flex justify-content-between">
            {/* Username */}
            <motion.h1
              className="fnt-page-title mb-5 truncate"
              variants={fromBottom}
              initial="hidden"
              animate="visible"
            >
              {`${user.firstName} ${user.lastName}`.toUpperCase()}
            </motion.h1>
            <motion.img
              className="user-profile-picture fx-rounded"
              variants={fromBottom}
              initial="hidden"
              animate="visible"
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
                    to={`${PUBLIC.USER_VIEW}/${userId}${PUBLIC.PLAYLISTS}`}
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
                    to={`${PUBLIC.USER_VIEW}/${userId}${PUBLIC.PLAYLISTS}`}
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
              {/* TODO User genres */}
              {!isLoading ? (
                userGenres.length > 0 && (
                  <HomeElement label="Genres" isAnimationContainer>
                    {userGenres.map((genre) => (
                      <div key={genre._id} className="mb-2 me-2">
                        <GenreCard>{genre.name.toUpperCase()}</GenreCard>
                      </div>
                    ))}
                  </HomeElement>
                )
              ) : (
                <HomeElement label="Liked tracks">
                  <Spinner isNegative />
                </HomeElement>
              )}
              {/* User albums */}
              {!isLoading ? (
                userAlbums.length > 0 && (
                  <HomeElement
                    label="Albums"
                    cols="12"
                    to={PUBLIC.ALBUMS}
                    isAnimationContainer
                  >
                    {userAlbums.map((album) => (
                      <AlbumCard
                        key={album._id}
                        albumId={album._id}
                        albumTitle={album.title}
                      />
                    ))}
                  </HomeElement>
                )
              ) : (
                <HomeElement label="Liked tracks">
                  <Spinner isNegative />
                </HomeElement>
              )}
              {/* User followers */}
              {!isLoading ? (
                userFollowers.length > 0 && (
                  <HomeElement
                    label="Followers"
                    sublabel={userFollowers.length}
                    cols="12"
                    isAnimationContainer
                  >
                    {userFollowers.map((following) => (
                      <UserCard
                        key={following._id}
                        userId={following._id}
                        userName={following.firstName}
                      />
                    ))}
                  </HomeElement>
                )
              ) : (
                <HomeElement label="Liked tracks">
                  <Spinner isNegative />
                </HomeElement>
              )}
              {/* User following */}
              {!isLoading ? (
                userFollowings.length > 0 && (
                  <HomeElement
                    label="Following"
                    sublabel={userFollowings.length}
                    cols="12"
                    isAnimationContainer
                  >
                    {userFollowings.map((following) => (
                      <UserCard
                        key={following._id}
                        userId={following._id}
                        userName={following.firstName}
                      />
                    ))}
                  </HomeElement>
                )
              ) : (
                <HomeElement label="Liked tracks">
                  <Spinner isNegative />
                </HomeElement>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}