/* eslint-disable no-nested-ternary */
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

export default function PopularWave() {
  const [loadStatus, setLoadStatus] = useState({
    popularGenres: false,
    popularUsers: false,
    popularAlbums: false,
    popularPlaylists: false,
    popularTracks: false,
  });
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
    setLoadStatus((prev) => ({ ...prev, popularGenres: true }));
  };

  // Albums
  const loadAlbums = async () => {
    try {
      const { data } = await getAllAlbums();
      setPopularAlbums(data.albums);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, popularAlbums: true }));
  };

  // Users
  const loadUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setPopularUsers(data.users);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, popularUsers: true }));
  };

  // Playlists
  const loadPlaylists = async () => {
    try {
      const { data } = await getAllPlaylists(0, 6);
      setPopularPlaylists(data.playlists);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, popularPlaylists: true }));
  };

  // Tracks
  const loadTracks = async () => {
    try {
      const {
        data: { tracks },
      } = await getAllTracks(0, 10);
      setPopularTracks(tracks);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, popularTracks: true }));
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
      <div className="col col-12 col-lg-10 row p-0 m-0 g-5 g-lg-4">
        {loadStatus.popularPlaylists ? (
          popularPlaylists.length > 0 ? (
            <HomeElement
              label="Playlists"
              to={`${PUBLIC.POPULAR}${PUBLIC.PLAYLISTS}`}
              cols="12 row-cols-md-1 col-lg-6"
              isAnimationContainer
            >
              {popularPlaylists && (
                <PlaylistList
                  playlists={popularPlaylists}
                  colsMd="6"
                  onAddFollowedColumn={() => {}}
                />
              )}
            </HomeElement>
          ) : (
            <HomeElement label="Playlists" cols="12 col-lg-6">
              <p className="fnt-caption fnt-secondary">No playlists</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Playlists" cols="12 col-lg-6">
            <Spinner classNames="ms-2" isNegative />
          </HomeElement>
        )}
        {loadStatus.popularTracks ? (
          popularTracks.length > 0 ? (
            <HomeElement
              label="Songs"
              to={`${PUBLIC.POPULAR}${PUBLIC.TRACKS}`}
              cols="12 col-lg-6"
              isAnimationContainer
            >
              <TrackList tracks={popularTracks} setTracks={setPopularTracks} />
            </HomeElement>
          ) : (
            <HomeElement label="Songs" cols="12 col-lg-6">
              <p className="fnt-caption fnt-secondary">No songs</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Playlists" cols="12 col-lg-6">
            <Spinner classNames="ms-2" isNegative />
          </HomeElement>
        )}
      </div>
      {/* Right */}
      <div className="col col-12 col-lg-2 row p-0 m-0 g-5 g-lg-4">
        {loadStatus.popularGenres ? (
          popularGenres.length > 0 ? (
            <HomeElement label="Genres" cols="4 col-lg-12" isAnimationContainer>
              {popularGenres.map((genre) => (
                <div key={genre.name} className="mb-2 me-2">
                  <GenreCard>{genre.name.toUpperCase()}</GenreCard>
                </div>
              ))}
            </HomeElement>
          ) : (
            <HomeElement label="Genres" cols="4 col-lg-12">
              <p className="fnt-caption fnt-secondary">No genres</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Genres" cols="4 col-lg-12">
            <Spinner classNames="ms-2" isNegative />
          </HomeElement>
        )}
        {loadStatus.popularAlbums ? (
          popularAlbums.length > 0 ? (
            <HomeElement
              label="Albums"
              to={`${PUBLIC.POPULAR}${PUBLIC.ALBUMS}`}
              cols="4 col-lg-12"
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
          ) : (
            <HomeElement label="Albums" cols="4 col-lg-12">
              <p className="fnt-caption fnt-secondary">No albums</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Albums" cols="4 col-lg-12">
            <Spinner classNames="ms-2" isNegative />
          </HomeElement>
        )}
        {loadStatus.popularUsers ? (
          popularUsers.length > 0 ? (
            <HomeElement label="Users" cols="4 col-lg-12" isAnimationContainer>
              {popularUsers.map((popular) => (
                <UserCard
                  key={popular._id}
                  userId={popular._id}
                  userName={popular.firstName}
                  isPopularView
                />
              ))}
            </HomeElement>
          ) : (
            <HomeElement label="Users" cols="4 col-lg-12">
              <p className="fnt-caption fnt-secondary">No users</p>
            </HomeElement>
          )
        ) : (
          <HomeElement label="Users" cols="4 col-lg-12">
            <Spinner classNames="ms-2" isNegative />
          </HomeElement>
        )}
      </div>
    </>
  );
}
