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
  const [loadStatus, setLoadStatus] = useState({
    myGenres: false,
    allGenres: false,
    myFollowers: false,
    myFollowings: false,
    myPlaylists: false,
    myFollowingPlaylists: false,
    myAlbums: false,
    myTracks: false,
    myLikedTracks: false,
  });
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
    setLoadStatus((prev) => ({ ...prev, myGenres: true }));
  };

  const loadMyGenres = () => {
    const allTracks = [];
    myTracks.map((track) => allTracks.push(track));
    myLikedTracks.map((track) => allTracks.push(track));
    getMyGenresFromTracks(allTracks);
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

  const loadMyFollowers = async () => {
    try {
      const { data } = await getMyFollowers();
      setMyFollowers(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, myFollowers: true }));
  };

  const loadMyFollowings = async () => {
    try {
      const { data } = await getMyFollowings();
      setMyFollowings(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, myFollowings: true }));
  };

  // Playlists

  const loadMyPlaylists = async () => {
    try {
      const { data } = await getMyPlaylists(0, 2);
      setMyPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, myPlaylists: true }));
  };

  const loadMyFollowingPlaylists = async () => {
    try {
      const { data } = await getFollowingPlaylists(0, 2);
      setMyFollowingPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, myFollowingPlaylists: true }));
  };

  // Albums

  const loadMyAlbums = async () => {
    try {
      const { data } = await getMyAlbums();
      setMyAlbums(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, myAlbums: true }));
  };

  // Tracks
  const loadMyTracks = async () => {
    try {
      const { data } = await getMyTracks();
      setMyTracks(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, myTracks: true }));
  };

  const loadMyLikedTracks = async () => {
    try {
      const { data } = await getLikedTracks();
      setMyLikedTracks(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, myLikedTracks: true }));
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
        {loadStatus.myPlaylists ? (
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

        {loadStatus.myFollowingPlaylists ? (
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
          <HomeElement label="Following playlists">
            <Spinner classNames="ms-2" isNegative />
          </HomeElement>
        )}

        {/* User tracks */}
        {loadStatus.myTracks ? (
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
            <HomeElement label="Uploaded songs" cols="12 col-lg-6">
              <p className="fnt-caption fnt-secondary">No uploaded songs</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Uploaded songs">
            <Spinner isNegative />
          </HomeElement>
        )}

        {/* User liked tracks */}
        {loadStatus.myLikedTracks ? (
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
            <HomeElement label="Liked songs" cols="12 col-lg-6">
              <p className="fnt-caption fnt-secondary">No liked songs</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked songs">
            <Spinner isNegative />
          </HomeElement>
        )}
      </div>
      {/* Right */}
      <div className="col col-12 col-lg-2 row p-0 m-0 g-5 g-lg-4">
        {loadStatus.myGenres ? (
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
              <p className="fnt-caption fnt-secondary">No genres</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked tracks" cols="3 col-lg-12">
            <Spinner isNegative />
          </HomeElement>
        )}

        {/* User albums */}
        {loadStatus.myAlbums ? (
          myAlbums.length > 0 ? (
            <HomeElement
              label="Albums"
              cols="3 col-lg-12"
              to={PUBLIC.ALBUMS}
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
              <p className="fnt-caption fnt-secondary">No albums</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked tracks">
            <Spinner isNegative />
          </HomeElement>
        )}

        {/* User followers */}
        {loadStatus.myFollowers ? (
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
              <p className="fnt-caption fnt-secondary">No followers</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Liked tracks">
            <Spinner isNegative />
          </HomeElement>
        )}

        {/* User following */}
        {loadStatus.myFollowings ? (
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
              <p className="fnt-caption fnt-secondary">No followings</p>
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
