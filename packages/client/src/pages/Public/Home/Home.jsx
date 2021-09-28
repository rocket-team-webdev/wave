import React, { useState } from "react";
import { useSelector } from "react-redux";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import HomeElement from "../../../components/HomeElement";
import Button from "../../../components/Button";
import PlaylistCard from "../../../components/PlaylistCard";
import ArtistCard from "../../../components/ArtistCard";
import Input from "../../../components/Input";
import RadioButtons from "../../../components/RadioButtons";

export default function Home() {
  const [popularView, setpopularView] = useState(true);

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
    "derivation rock",
  ];

  const handleChangeView = (e) => {
    console.log(e.target.id);
    if (e.target.id === "myWaveRadio") {
      setpopularView(false);
    } else {
      setpopularView(true);
    }
    console.log(popularView);
  };

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
          {/* Popular/MyWave */}
          <div className="d-flex flex-column align-items-end mb-2">
            <p className="fnt-caption fnt-light m-2">App view</p>
            <RadioButtons handleChange={handleChangeView} />
          </div>
          {/* Switch view */}
          {popularView ? (
            <div>
              {/* Genres */}
              <HomeElement label="Genres">
                {genresList.map((genre) => (
                  <div key={genre} className="mb-2 me-2">
                    <Button isSmall>{genre.toUpperCase()}</Button>
                  </div>
                ))}
              </HomeElement>
              {/* Artists */}
              <HomeElement label="Artists">
                {artistsList.map((artistName) => (
                  <ArtistCard
                    classNames="me-4 mb-3"
                    key={artistName}
                    artistName={artistName}
                  />
                ))}
              </HomeElement>
              {/* Playlists */}
              <HomeElement label="Playlists">
                {playlistsList.map((playlistName) => (
                  <PlaylistCard
                    key={playlistName}
                    classNames="mb-3"
                    playlistName={playlistName}
                  />
                ))}
              </HomeElement>
            </div>
          ) : (
            <p>User view</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
