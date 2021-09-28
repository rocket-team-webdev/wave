import React from "react";
import { useSelector } from "react-redux";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import HomeElement from "../../../components/HomeElement";
import Button from "../../../components/Button";
import PlaylistCard from "../../../components/PlaylistCard";
import ArtistCard from "../../../components/ArtistCard";
import Input from "../../../components/Input";

export default function Home() {
  const userState = useSelector((state) => state.user);
  const userFirstName = userState.firstName;

  const genresList = [
    "soul",
    "funk",
    "jazz",
    "folk",
    "indie",
    "metal",
    "classical",
    "country",
    "electronic",
    "lounge",
    "grunge",
    "other",
  ];

  const artistsList = [
    "Chet Baker",
    "Red Hot Chili Peppers",
    "Fatboy Slim",
    "Arctic Monkeys",
  ];

  const playlistsList = [
    "jazz attitude",
    "funk the blues",
    "sunrise folk",
    "technomasia",
    "derivaiton rock",
  ];

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        <div className="col col-12 col-md-6 p-0 left-side">
          <JumboText secText={userFirstName} cols="12" isNegative />
          <form className="mt-5" action="">
            <Input
              label="searchbar"
              id="searchbar"
              classNames="col col-12 col-md-6"
              isNegative
            />
          </form>
        </div>
        <div className="col col-12 col-md-5 fx-rounded p-0">
          {/* Genres */}
          <HomeElement label="Genres">
            {/* !!! TODO map genres from user */}
            {genresList.map((genre) => (
              <div key={genre} className="mb-2 me-2">
                <Button isSmall>{genre.toUpperCase()}</Button>
              </div>
            ))}
          </HomeElement>
          {/* Artists */}
          <HomeElement label="Artists">
            {/* !!! TODO map artists from user */}
            {artistsList.map((artistName) => (
              <ArtistCard
                classNames="me-4"
                key={artistName}
                artistName={artistName}
              />
            ))}
          </HomeElement>
          {/* Playlists */}
          <HomeElement label="Playlists">
            {/* !!! TODO map playlists from user */}
            {playlistsList.map((playlistName) => (
              <PlaylistCard
                classNames="me-3 mb-3"
                key={playlistName}
                playlistName={playlistName}
              />
            ))}
          </HomeElement>
          {/* ... */}
        </div>
      </div>
    </Layout>
  );
}
