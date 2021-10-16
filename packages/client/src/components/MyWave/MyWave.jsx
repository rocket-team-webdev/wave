/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  getMyFollowers,
  getMyFollowings,
  getMyPlaylists,
  getFollowingPlaylists,
  getMyAlbums,
  getMyTracks,
  getLikedTracks,
} from "../../api/me-api";

import { getAllGenres } from "../../api/genre-api";
import { uniqueValuesArray } from "../../utils/arrayFunctions";

export default function MyWave() {
  const [isLoading, setIsLoading] = useState(false);
  const [myGenres, setMyGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [myFollowers, setMyFollowers] = useState([]);
  const [myFollowings, setMyFollowings] = useState([]);
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [myFollowingPlaylists, setMyFollowingPlaylists] = useState([]);
  const [myAlbums, setMyAlbums] = useState([]);
  const [myTracks, setMyTracks] = useState([]);
  const [myLikedTracks, setMyLikedTracks] = useState([]);

  const location = useLocation();

  // Genres
  const getMyGenresFromTracks = (tracksArray) => {
    const genresArray = [];
    tracksArray.map((track) => {
      const foundMyGenre = allGenres.filter(
        (genre) => genre._id === track.genreId,
      );
      genresArray.push(...foundMyGenre);
      return genresArray;
    });
    const cleanedGenres = uniqueValuesArray(genresArray);
    setMyGenres(cleanedGenres);
  };

  const loadMyGenres = () => {
    const allTracks = [];
    myTracks.map((track) => allTracks.push(track));
    myLikedTracks.map((track) => allTracks.push(track));
    getMyGenresFromTracks(allTracks);
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

  const loadMyFollowers = async () => {
    setIsLoading(true);
    try {
      const { data } = await getMyFollowers();
      setMyFollowers(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  const loadMyFollowings = async () => {
    setIsLoading(true);
    try {
      const { data } = await getMyFollowings();
      setMyFollowings(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  // Playlists

  const loadMyPlaylists = async () => {
    setIsLoading(true);
    try {
      const { data } = await getMyPlaylists(0, 2);
      setMyPlaylists(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  const loadMyFollowingPlaylists = async () => {
    setIsLoading(true);
    try {
      const { data } = await getFollowingPlaylists(0, 2);
      setMyFollowingPlaylists(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  // Albums

  const loadMyAlbums = async () => {
    setIsLoading(true);
    try {
      const { data } = await getMyAlbums();
      setMyAlbums(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  // Tracks
  const loadMyTracks = async () => {
    setIsLoading(true);
    try {
      const { data } = await getMyTracks();
      setMyTracks(data.data);

      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };
  const loadMyLikedTracks = async () => {
    setIsLoading(true);
    try {
      const { data } = await getLikedTracks();
      setMyLikedTracks(data.data);
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
    loadMyFollowers();
    loadMyFollowings();
    // Playlists
    loadMyPlaylists();
    loadMyFollowingPlaylists();
    // Albums
    loadMyAlbums();
    // Tracks
    loadMyTracks();
    loadMyLikedTracks();
  };

  useEffect(() => {
    initialFetch();
  }, []);

  // When user clicks in user link
  useEffect(() => {
    initialFetch();
  }, [location.pathname]);

  useEffect(() => {
    loadMyGenres();
  }, [myTracks, myLikedTracks]);

  return (
    <>
      {/* Left */}
      <div className="col col-12 col-lg-10 row p-0 m-0 g-5 g-lg-4">
        {/* User playlists */}
        {!isLoading ? (
          myPlaylists.length > 0 ? (
            <HomeElement
              label="Created playlists"
              cols="12 row-cols-md-1 col-lg-6"
              isAnimationContainer
              to={`${PUBLIC.MY_PLAYLISTS}`}
            >
              <PlaylistList
                playlists={myPlaylists}
                colsMd="6"
                onAddFollowedColumn={() => {}}
              />
            </HomeElement>
          ) : (
            <HomeElement label="Created playlists" cols="3 col-lg-12">
              No created playlists
            </HomeElement>
          )
        ) : (
          <HomeElement
            label="Created playlists"
            cols="12 row-cols-md-1 col-lg-6"
          >
            <Spinner isNegative />
          </HomeElement>
        )}
        {!isLoading ? (
          myFollowingPlaylists.length > 0 ? (
            <HomeElement
              label="Following playlists"
              cols="12 row-cols-md-1 col-lg-6"
              isAnimationContainer
              to={`${PUBLIC.MY_PLAYLISTS}`}
            >
              <PlaylistList
                playlists={myFollowingPlaylists}
                colsMd="6"
                onAddFollowedColumn={() => {}}
              />
            </HomeElement>
          ) : (
            <HomeElement label="Following playlists" cols="3 col-lg-12">
              No following playlists
            </HomeElement>
          )
        ) : (
          <HomeElement label="Following playlists">
            <Spinner isNegative />
          </HomeElement>
        )}
        {/* User tracks */}
        {!isLoading ? (
          myTracks.length > 0 ? (
            <HomeElement
              label="Uploaded songs"
              cols="12 col-lg-6"
              isAnimationContainer
              to={PUBLIC.MY_SONGS}
            >
              <TrackList tracks={myTracks} setTrakcs={setMyTracks} />
            </HomeElement>
          ) : (
            <HomeElement label="Uploaded songs" cols="3 col-lg-12">
              No uploaded songs
            </HomeElement>
          )
        ) : (
          <HomeElement label="Uploaded songs">
            <Spinner isNegative />
          </HomeElement>
        )}
        {/* User liked tracks */}
        {!isLoading ? (
          myLikedTracks.length > 0 ? (
            <HomeElement
              label="Liked songs"
              cols="12 col-lg-6"
              isAnimationContainer
              to={PUBLIC.MY_SONGS}
            >
              <TrackList tracks={myLikedTracks} setTrakcs={setMyLikedTracks} />
            </HomeElement>
          ) : (
            <HomeElement label="Liked songs" cols="3 col-lg-12">
              No liked tracks
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked songs">
            <Spinner isNegative />
          </HomeElement>
        )}
      </div>
      {/* Right */}
      <div className="col col-12 col-lg-2 row p-0 m-0 g-4">
        {!isLoading ? (
          myGenres.length > 0 ? (
            <HomeElement label="Genres" cols="3 col-lg-12" isAnimationContainer>
              {myGenres.map((genre) => (
                <div key={genre._id} className="mb-2 me-2">
                  <GenreCard>{genre.name.toUpperCase()}</GenreCard>
                </div>
              ))}
            </HomeElement>
          ) : (
            <HomeElement label="Genres" cols="3 col-lg-12">
              No genres
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked tracks" cols="3 col-lg-12">
            <Spinner isNegative />
          </HomeElement>
        )}
        {/* User albums */}
        {!isLoading ? (
          myAlbums.length > 0 ? (
            <HomeElement
              label="Albums"
              cols="3 col-lg-12"
              // to={PUBLIC.ALBUMS}
              isAnimationContainer
            >
              {myAlbums.map((album) => (
                <AlbumLink
                  key={album._id}
                  albumId={album._id}
                  albumTitle={album.title}
                />
              ))}
            </HomeElement>
          ) : (
            <HomeElement label="Albums" cols="3 col-lg-12">
              No albums
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked tracks">
            <Spinner isNegative />
          </HomeElement>
        )}
        {/* User followers */}
        {!isLoading ? (
          myFollowers.length > 0 ? (
            <HomeElement
              label="Followers"
              sublabel={myFollowers.length}
              cols="3 col-lg-12"
              isAnimationContainer
            >
              {myFollowers.map((following) => (
                <UserCard
                  key={following._id}
                  userId={following._id}
                  userName={following.firstName}
                />
              ))}
            </HomeElement>
          ) : (
            <HomeElement label="Followers" cols="3 col-lg-12">
              No followers
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked tracks">
            <Spinner isNegative />
          </HomeElement>
        )}
        {/* User following */}
        {!isLoading ? (
          myFollowings.length > 0 ? (
            <HomeElement
              label="Following"
              sublabel={myFollowings.length}
              cols="3 col-lg-12"
              isAnimationContainer
            >
              {myFollowings.map((following) => (
                <UserCard
                  key={following._id}
                  userId={following._id}
                  userName={following.firstName}
                />
              ))}
            </HomeElement>
          ) : (
            <HomeElement label="Following" cols="3 col-lg-12">
              No followings
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked tracks">
            <Spinner isNegative />
          </HomeElement>
        )}
      </div>
    </>
  );
}
