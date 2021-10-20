/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import HomeElement from "../HomeElement";
import AlbumLink from "../AlbumLink";
import GenreCard from "../GenreCard";
import UserCard from "../UserCard";
import PlaylistList from "../PlaylistList/PlaylistList";
import TrackList from "../TrackList";
import Spinner from "../Spinner";

import { PUBLIC } from "../../constants/routes";

import {
  getUserFollowers,
  getUserFollowings,
  getUserPlaylists,
  getUserFollowingPlaylists,
  getUserAlbums,
  getUserTracks,
  getUserLikedTracks,
} from "../../api/users-api";

import { getAllGenres } from "../../api/genre-api";
import { uniqueValuesArray } from "../../utils/arrayFunctions";

export default function UserWave() {
  const [loadStatus, setLoadStatus] = useState({
    userGenres: false,
    allGenres: false,
    userFollowers: false,
    userFollowings: false,
    userPlaylists: false,
    userFollowingPlaylists: false,
    userAlbums: false,
    userTracks: false,
    userLikedTracks: false,
  });
  const [userGenres, setUserGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [userFollowingPlaylists, setUserFollowingPlaylists] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);
  const [userTracks, setUserTracks] = useState([]);
  const [userLikedTracks, setUserLikedTracks] = useState([]);

  // const [uploadFollowers, setUploadFollowers] = useState(setUpdateFollowers);

  const userState = useSelector((state) => state.user);
  const currentUserId = userState.mongoId;

  const { userId } = useRouteMatch(`${PUBLIC.USERS}/:userId`).params;

  const location = useLocation();

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
    setLoadStatus((prev) => ({ ...prev, userGenres: true }));
  };

  const loadUserGenres = () => {
    const allTracks = [];
    userTracks.map((track) => allTracks.push(track));
    userLikedTracks.map((track) => allTracks.push(track));
    getUserGenresFromTracks(allTracks);
  };

  const loadAllGenres = async () => {
    try {
      const { data } = await getAllGenres();
      setAllGenres(data.genres);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, allGenres: true }));
  };

  // Users

  const loadUserFollowers = async () => {
    try {
      const { data } = await getUserFollowers(userId);
      setUserFollowers(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, userFollowers: true }));
  };

  const loadUserFollowings = async () => {
    try {
      const { data } = await getUserFollowings(userId);
      setUserFollowings(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, userFollowings: true }));
  };

  // Playlists

  const loadUserPlaylists = async () => {
    try {
      const { data } = await getUserPlaylists(userId, 0, 2);
      setUserPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, userPlaylists: true }));
  };

  const loadUserFollowingPlaylists = async () => {
    try {
      const { data } = await getUserFollowingPlaylists(userId, 0, 2);
      setUserFollowingPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, userFollowingPlaylists: true }));
  };

  // Albums

  const loadUserAlbums = async () => {
    try {
      const { data } = await getUserAlbums(userId);
      setUserAlbums(data.albums);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, userAlbums: true }));
  };

  // Tracks
  const loadUserTracks = async () => {
    try {
      const { data } = await getUserTracks(userId);
      setUserTracks(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, userTracks: true }));
  };

  const loadUserLikedTracks = async () => {
    try {
      const { data } = await getUserLikedTracks(userId);
      setUserLikedTracks(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, userLikedTracks: true }));
  };

  const initialFetch = () => {
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
  };

  useEffect(() => {
    initialFetch();
  }, []);

  // When user clicks in user link
  useEffect(() => {
    initialFetch();
  }, [location.pathname]);

  useEffect(() => {
    loadUserGenres();
  }, [userTracks, userLikedTracks]);

  return (
    <>
      {/* Left */}
      <div className="col col-12 col-lg-10 row p-0 m-0 g-5 g-lg-4 mt-5">
        {/* User playlists */}
        {loadStatus.userPlaylists ? (
          userPlaylists.length > 0 ? (
            <HomeElement
              label="Created playlists"
              cols="12 row-cols-md-1 col-lg-6"
              isAnimationContainer
              to={
                userId === currentUserId
                  ? `${PUBLIC.PLAYLISTS}`
                  : `${PUBLIC.USER_VIEW}/${userId}${PUBLIC.PLAYLISTS}`
              }
            >
              <PlaylistList
                playlists={userPlaylists}
                onAddFollowedColumn={() => {}}
              />
            </HomeElement>
          ) : (
            <HomeElement
              label="Created playlists"
              cols="12 row-cols-md-1 col-lg-6"
            >
              <p className="fnt-caption fnt-secondary">No created playlists</p>
            </HomeElement>
          )
        ) : (
          <HomeElement
            label="Created playlists"
            cols="12 row-cols-md-1 col-lg-6"
          >
            <Spinner classNames="ms-2" isNegative />
          </HomeElement>
        )}
        {/* User following playlists */}
        {loadStatus.userFollowingPlaylists ? (
          userFollowingPlaylists.length > 0 ? (
            <HomeElement
              label="Following playlists"
              cols="12 row-cols-md-1 col-lg-6"
              isAnimationContainer
              to={
                userId === currentUserId
                  ? `${PUBLIC.PLAYLISTS}`
                  : `${PUBLIC.USER_VIEW}/${userId}${PUBLIC.PLAYLISTS}`
              }
            >
              <PlaylistList
                playlists={userFollowingPlaylists}
                onAddFollowedColumn={() => {}}
              />
            </HomeElement>
          ) : (
            <HomeElement
              label="Following playlists"
              cols="12 row-cols-md-1 col-lg-6"
            >
              <p className="fnt-caption fnt-secondary">
                No following playlists
              </p>
            </HomeElement>
          )
        ) : (
          <HomeElement
            label="Following playlists"
            cols="12 row-cols-md-1 col-lg-6"
          >
            <Spinner classNames="ms-2" isNegative />
          </HomeElement>
        )}
        {/* User tracks */}
        {loadStatus.userTracks ? (
          userTracks.length > 0 ? (
            <HomeElement
              label="Uploaded tracks"
              cols="12 row-cols-md-1 col-lg-6"
              isAnimationContainer
              to={`${PUBLIC.USER_VIEW}/${userId}${PUBLIC.TRACKS}`}
            >
              <TrackList tracks={userTracks} setTracks={setUserTracks} />
            </HomeElement>
          ) : (
            <HomeElement
              label="Uploaded songs"
              cols="12 row-cols-md-1 col-lg-6"
            >
              <p className="fnt-caption fnt-secondary">No uploaded songs</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Uploaded tracks">
            <Spinner isNegative />
          </HomeElement>
        )}
        {/* User liked tracks */}
        {loadStatus.userLikedTracks ? (
          userLikedTracks.length > 0 ? (
            <HomeElement
              label="Liked tracks"
              cols="12 row-cols-md-1 col-lg-6"
              isAnimationContainer
              to={`${PUBLIC.USER_VIEW}/${userId}${PUBLIC.TRACKS}`}
            >
              <TrackList
                tracks={userLikedTracks}
                setTracks={setUserLikedTracks}
              />
            </HomeElement>
          ) : (
            <HomeElement label="Liked songs" cols="12 row-cols-md-1 col-lg-6">
              <p className="fnt-caption fnt-secondary">No liked songs</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked tracks">
            <Spinner isNegative />
          </HomeElement>
        )}
      </div>
      {/* Right */}
      <div className="col col-12 col-lg-2 row p-0 m-0 g-5 g-lg-4 mt-5">
        {loadStatus.userGenres ? (
          userGenres.length > 0 ? (
            <HomeElement label="Genres" cols="3 col-lg-12" isAnimationContainer>
              {userGenres.map((genre) => (
                <div key={genre._id} className="mb-2 me-2">
                  <GenreCard>{genre.name.toUpperCase()}</GenreCard>
                </div>
              ))}
            </HomeElement>
          ) : (
            <HomeElement label="Genres" cols="3 col-lg-12">
              <p className="fnt-caption fnt-secondary">No genres</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked tracks">
            <Spinner isNegative />
          </HomeElement>
        )}
        {/* User albums */}
        {loadStatus.userAlbums ? (
          userAlbums.length > 0 ? (
            <HomeElement
              label="Albums"
              cols="3 col-lg-12"
              to={
                userId === currentUserId
                  ? `${PUBLIC.ALBUMS}`
                  : `${PUBLIC.USER_VIEW}/${userId}${PUBLIC.ALBUMS}`
              }
              isAnimationContainer
            >
              {userAlbums.map((album) => (
                <AlbumLink
                  key={album._id}
                  albumId={album._id}
                  albumTitle={album.title}
                />
              ))}
            </HomeElement>
          ) : (
            <HomeElement label="Albums" cols="3 col-lg-12">
              <p className="fnt-caption fnt-secondary">No albums</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked tracks">
            <Spinner classNames="ms-2" isNegative />
          </HomeElement>
        )}
        {/* User followers */}
        {loadStatus.userFollowers ? (
          userFollowers.length > 0 ? (
            <HomeElement
              label="Followers"
              sublabel={userFollowers.length}
              cols="3 col-lg-12"
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
          ) : (
            <HomeElement label="Followers" cols="3 col-lg-12">
              <p className="fnt-caption fnt-secondary">No followers</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked tracks">
            <Spinner isNegative />
          </HomeElement>
        )}
        {/* User following */}
        {loadStatus.userFollowings ? (
          userFollowings.length > 0 ? (
            <HomeElement
              label="Following"
              sublabel={userFollowings.length}
              cols="3 col-lg-12"
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
          ) : (
            <HomeElement label="Following" cols="3 col-lg-12">
              <p className="fnt-caption fnt-secondary">No followings</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked tracks" cols="3 col-lg-12">
            <Spinner isNegative />
          </HomeElement>
        )}
      </div>
    </>
  );
}
