import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import HomeElement from "../HomeElement";
import GenreCard from "../GenreCard";
import ArtistCard from "../ArtistCard";
// import PlaylistCard from "../PlaylistCard";
import TrackList from "../TrackList";
import Spinner from "../Spinner";

import { getAllGenres } from "../../api/genre-api";
import { getAllPlaylists } from "../../api/playlists-api";
import { getAllTracks } from "../../api/tracks-api";
// import { containerAnimation } from "../../utils/motionSettings";
import PlaylistList from "../PlaylistList";

import { PUBLIC } from "../../constants/routes";

export default function HomePopular({ artistsList = [] }) {
  const [loadStatus, setLoadStatus] = useState(false);
  const [popularGenres, setPopularGenres] = useState([]);
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

  // Playlists
  const loadPlaylists = async () => {
    try {
      setLoadStatus(true);
      const { data } = await getAllPlaylists();
      setPopularPlaylists(data.playlists);
      setLoadStatus(false);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // Tracks
  const loadTracks = async () => {
    try {
      const { data } = await getAllTracks();
      setPopularTracks(data.tracks);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  useEffect(() => {
    loadGenres();
    loadPlaylists();
    loadTracks();
  }, []);

  return (
    <div className="row gx-4 gy-5">
      {popularGenres.length > 0 && (
        <HomeElement label="Genres" isAnimationContainer>
          {popularGenres.map((genre) => (
            <div key={genre.name} className="mb-2 me-2">
              <GenreCard>{genre.name.toUpperCase()}</GenreCard>
            </div>
          ))}
        </HomeElement>
      )}
      {artistsList.length > 0 && (
        <HomeElement label="Artists" isAnimationContainer>
          {artistsList.map((artistName) => (
            <ArtistCard
              key={artistName}
              artistName={artistName}
              // classNames=""
            />
          ))}
        </HomeElement>
      )}
      {!loadStatus ? (
        popularPlaylists.length > 0 && (
          <HomeElement
            label="Playlists"
            to={PUBLIC.MY_PLAYLISTS}
            isAnimationContainer
          >
            {popularPlaylists && (
              <PlaylistList
                playlists={popularPlaylists}
                onAddFollowedColumn={() => {}}
              />
            )}
            {/* {popularPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist._id}
                playListId={playlist._id}
                playlistName={playlist.name}
                userId={playlist.userId}
                // classNames=""
              />
            ))} */}
          </HomeElement>
        )
      ) : (
        <HomeElement label="Playlists">
          <Spinner isNegative />
        </HomeElement>
      )}
      {popularTracks.length > 0 && (
        <HomeElement label="Tracks">
          <TrackList tracks={popularTracks} />
        </HomeElement>
      )}
    </div>
  );
}
