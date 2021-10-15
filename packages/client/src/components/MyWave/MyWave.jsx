/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import HomeElement from "../HomeElement";
import AlbumCard from "../AlbumCard";
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
      console.log("data: ", data);
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
      const { data } = await getMyPlaylists();
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
      const { data } = await getFollowingPlaylists();
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
    <div className="user-bottom row p-0 mt-4">
      {/* Bottom left */}
      <div className="col col-12 col-md-10 bottom-left row p-0 m-0 gx-4 gy-5">
        {/* User playlists */}
        {!isLoading ? (
          myPlaylists.length > 0 && (
            <HomeElement
              label="Created playlists"
              cols="6"
              isAnimationContainer
              to={`${PUBLIC.MY_PLAYLISTS}`}
            >
              <PlaylistList
                playlists={myPlaylists}
                onAddFollowedColumn={() => {}}
              />
            </HomeElement>
          )
        ) : (
          <HomeElement label="Created playlists">
            <Spinner isNegative />
          </HomeElement>
        )}
        {!isLoading ? (
          myFollowingPlaylists.length > 0 && (
            <HomeElement
              label="Following playlists"
              cols="6"
              isAnimationContainer
              to={`${PUBLIC.MY_PLAYLISTS}`}
            >
              <PlaylistList
                playlists={myFollowingPlaylists}
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
          myTracks.length > 0 && (
            <HomeElement
              label="Uploaded tracks"
              cols="6"
              isAnimationContainer
              to={PUBLIC.MY_SONGS}
            >
              <TrackList tracks={myTracks} setTrakcs={setMyTracks} />
            </HomeElement>
          )
        ) : (
          <HomeElement label="Uploaded tracks">
            <Spinner isNegative />
          </HomeElement>
        )}
        {/* User liked tracks */}
        {!isLoading ? (
          myLikedTracks.length > 0 && (
            <HomeElement
              label="Liked tracks"
              cols="6"
              isAnimationContainer
              to={PUBLIC.MY_SONGS}
            >
              <TrackList tracks={myLikedTracks} setTrakcs={setMyLikedTracks} />
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
          myGenres.length > 0 && (
            <HomeElement label="Genres" isAnimationContainer>
              {myGenres.map((genre) => (
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
          myAlbums.length > 0 && (
            <HomeElement
              label="Albums"
              cols="12"
              // to={PUBLIC.ALBUMS}
              isAnimationContainer
            >
              {myAlbums.map((album) => (
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
          myFollowers.length > 0 && (
            <HomeElement
              label="Followers"
              sublabel={myFollowers.length}
              cols="12"
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
          )
        ) : (
          <HomeElement label="Liked tracks">
            <Spinner isNegative />
          </HomeElement>
        )}
        {/* User following */}
        {!isLoading ? (
          myFollowings.length > 0 && (
            <HomeElement
              label="Following"
              sublabel={myFollowings.length}
              cols="12"
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
