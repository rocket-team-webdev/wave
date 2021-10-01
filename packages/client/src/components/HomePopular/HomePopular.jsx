import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import HomeElement from "../HomeElement";
import Button from "../Button";
import ArtistCard from "../ArtistCard";
import PlaylistCard from "../PlaylistCard";
import TrackCard from "../TrackCard";

import { PUBLIC } from "../../constants/routes";

import { getAllGenres } from "../../api/genre-api";
import { getAllPlaylists } from "../../api/playlists-api";
import { getAllTracks } from "../../api/tracks-api";

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
        <HomeElement label="Genres">
          {popularGenres.map((genre) => (
            <div key={genre.name} className="mb-2 me-2">
              <Button isSmall>{genre.name.toUpperCase()}</Button>
            </div>
          ))}
        </HomeElement>
      )}
      {artistsList.length > 0 && (
        <HomeElement label="Artists">
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
          <HomeElement label="Playlists">
            {popularPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist._id}
                playListId={playlist._id}
                playlistName={playlist.name}
                userId={playlist.userId}
                // classNames=""
              />
            ))}
          </HomeElement>
        )
      ) : (
        <HomeElement label="Playlists">Loading...</HomeElement>
      )}
      {popularTracks.length > 0 && (
        <HomeElement label="Tracks" to={PUBLIC.MY_SONGS}>
          {popularTracks.map((track, i) => (
            <TrackCard
              key={track._id}
              trackNumber={i + 1}
              trackImg={track.album.thumbnail}
              trackName={track.name}
              artist={track.artist}
              albumName={track.album.title}
              albumId={track.album._id}
              time={track.duration}
              userId={track.userId}
              // playcounter
              trackUrl={track.url}
              genreId={track.genreId}
              isLiked={track.isLiked}
              trackId={track._id}
            />
          ))}
        </HomeElement>
      )}
    </div>
  );
}
