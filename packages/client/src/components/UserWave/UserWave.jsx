import React, { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [userGenres, setUserGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [userFollowingPlaylists, setUserFollowingPlaylists] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);
  const [userTracks, setUserTracks] = useState([]);
  const [userLikedTracks, setUserLikedTracks] = useState([]);

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
      const { data } = await getUserPlaylists(userId, 0, 2);
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
      const { data } = await getUserFollowingPlaylists(userId, 0, 2);
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
      setUserAlbums(data.albums);
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
            <HomeElement label="Uploaded tracks" cols="6" isAnimationContainer>
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
            <HomeElement label="Liked tracks" cols="6" isAnimationContainer>
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
                <AlbumLink
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
  );
}
