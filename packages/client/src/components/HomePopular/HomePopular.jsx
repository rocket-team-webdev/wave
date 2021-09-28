import React from "react";

import HomeElement from "../HomeElement";
import Button from "../Button";
import PlaylistCard from "../PlaylistCard";
import ArtistCard from "../ArtistCard";

export default function HomePopular({
  genresList = [],
  artistsList = [],
  playlistsList = [],
}) {
  return (
    <div>
      {genresList && (
        <HomeElement label="Genres">
          {genresList.map((genre) => (
            <div key={genre} className="mb-2 me-2">
              <Button isSmall>{genre.toUpperCase()}</Button>
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
      {playlistsList && (
        <HomeElement label="Playlists">
          {playlistsList.map((playlistName) => (
            <PlaylistCard
              key={playlistName}
              // classNames=""
              playlistName={playlistName}
              hasHeart
            />
          ))}
        </HomeElement>
      )}
    </div>
  );
}
