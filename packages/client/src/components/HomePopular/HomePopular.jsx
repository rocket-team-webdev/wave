import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import HomeElement from "../HomeElement";
import Button from "../Button";
import PlaylistCard from "../PlaylistCard";
import ArtistCard from "../ArtistCard";

import { getAllPlaylists } from "../../api/playlists-api";

export default function HomePopular({ genresList = [], artistsList = [] }) {
  const [loadStatus, setLoadStatus] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const loadPlaylists = async () => {
    try {
      setLoadStatus(true);
      const { data } = await getAllPlaylists();
      await setPlaylists(data.playlists);
      setLoadStatus(false);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  return (
    <div className="row m-0">
      {genresList && (
        <HomeElement label="Genres">
          {genresList.map((genre) => (
            <div key={genre.name} className="mb-2 me-2">
              <Button isSmall>{genre.name.toUpperCase()}</Button>
            </div>
          ))}
        </HomeElement>
      )}
      {artistsList && (
        <HomeElement label="Artists">
          {artistsList.map((artistName) => (
            <ArtistCard
              // classNames=""
              key={artistName}
              artistName={artistName}
            />
          ))}
        </HomeElement>
      )}
      {!loadStatus ? (
        playlists && (
          <HomeElement label="Playlists">
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist._id}
                // classNames=""
                playlistName={playlist.name}
                hasHeart
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
