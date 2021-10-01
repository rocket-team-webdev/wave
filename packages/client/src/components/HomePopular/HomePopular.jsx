import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import HomeElement from "../HomeElement";
import Button from "../Button";
import PlaylistCard from "../PlaylistCard";
import ArtistCard from "../ArtistCard";

import { getGenres } from "../../api/genre-api";
import { getAllPlaylists } from "../../api/playlists-api";

export default function HomePopular({ artistsList = [] }) {
  const [loadStatus, setLoadStatus] = useState(false);
  const [popularGenres, setPopularGenres] = useState([]);
  const [popularplaylists, setPopularPlaylists] = useState([]);

  // Popular genres
  const loadGenres = async () => {
    try {
      const { data } = await getGenres();
      setPopularGenres(data.genres);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // Popular playlists
  const loadPlaylists = async () => {
    try {
      setLoadStatus(true);
      const { data } = await getAllPlaylists();
      console.log("Playlist => ", data.playlists);
      setPopularPlaylists(data.playlists);
      setLoadStatus(false);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  useEffect(() => {
    loadGenres();
    loadPlaylists();
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
        <HomeElement label="Popular artists">
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
        popularplaylists.length > 0 && (
          <HomeElement label="Popular playlists">
            {popularplaylists.map((playlist) => (
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
    </div>
  );
}
