import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import HomeElement from "../HomeElement";
import GenreCard from "../GenreCard";
import UserCard from "../UserCard";
import AlbumLink from "../AlbumLink";
import Spinner from "../Spinner";
import PlaylistList from "../PlaylistList";
import TrackList from "../TrackList";

import { getAllGenres } from "../../api/genre-api";
import { getAllPlaylists } from "../../api/playlists-api";
import { getAllTracks } from "../../api/tracks-api";
import { getAllUsers } from "../../api/users-api";
import { getAllAlbums } from "../../api/album-api";
import { PUBLIC } from "../../constants/routes";

export default function HomePopular() {
  const [loadStatus, setLoadStatus] = useState(false);
  const [popularGenres, setPopularGenres] = useState([]);
  const [popularUsers, setPopularUsers] = useState([]);
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [popularPlaylists, setPopularPlaylists] = useState([]);
  const [popularTracks, setPopularTracks] = useState([]);

  // Genres
  const loadGenres = async () => {
    try {
      const { data } = await getAllGenres();
      setPopularGenres(data.genres);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // Albums
  const loadAlbums = async () => {
    try {
      const { data } = await getAllAlbums();
      setPopularAlbums(data.albums);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // Users
  const loadUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setPopularUsers(data.users);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // Playlists
  const loadPlaylists = async () => {
    try {
      setLoadStatus(true);
      const { data } = await getAllPlaylists(0, 6);
      setPopularPlaylists(data.playlists);
      setLoadStatus(false);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // Tracks
  const loadTracks = async () => {
    try {
      const { data } = await getAllTracks(0, 10);
      setPopularTracks(data.tracks);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  useEffect(() => {
    loadGenres();
    loadUsers();
    loadAlbums();
    loadPlaylists();
    loadTracks();
  }, []);

  return (
    <>
      {/* Left */}
      <div className="col col-12 col-md-10 row p-0 m-0 g-4">
        {!loadStatus ? (
          popularPlaylists.length > 0 && (
            <HomeElement
              label="Playlists"
              to={`${PUBLIC.POPULAR}${PUBLIC.PLAYLISTS}`}
              cols="6"
              isAnimationContainer
            >
              {popularPlaylists && (
                <PlaylistList
                  playlists={popularPlaylists}
                  onAddFollowedColumn={() => {}}
                />
              )}
            </HomeElement>
          )
        ) : (
          <HomeElement label="Playlists">
            <Spinner isNegative />
          </HomeElement>
        )}
        {popularTracks.length > 0 && (
          <HomeElement
            label="Tracks"
            to={`${PUBLIC.POPULAR}${PUBLIC.TRACKS}`}
            cols="6"
          >
            <TrackList tracks={popularTracks} setTracks={setPopularTracks} />
          </HomeElement>
        )}
      </div>
      {/* Right */}
      <div className="col col-12 col-md-2 row p-0 m-0 g-4">
        {popularGenres.length > 0 && (
          <HomeElement
            label="Genres"
            to={`${PUBLIC.POPULAR}${PUBLIC.TRACKS}`}
            isAnimationContainer
          >
            {popularGenres.map((genre) => (
              <div key={genre.name} className="mb-2 me-2">
                <GenreCard>{genre.name.toUpperCase()}</GenreCard>
              </div>
            ))}
          </HomeElement>
        )}
        {!loadStatus ? (
          popularAlbums.length > 0 && (
            <HomeElement
              label="Albums"
              to={`${PUBLIC.POPULAR}${PUBLIC.ALBUMS}`}
              isAnimationContainer
            >
              {popularAlbums.map((album) => (
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
        {popularUsers.length > 0 && (
          <HomeElement label="Users" isAnimationContainer>
            {popularUsers.map((popular) => (
              <UserCard
                key={popular._id}
                userId={popular._id}
                userName={popular.firstName}
              />
            ))}
          </HomeElement>
        )}
      </div>
    </>
  );
}
