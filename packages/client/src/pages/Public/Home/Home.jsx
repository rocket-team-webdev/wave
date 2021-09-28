import React, { useState } from "react";
import { useSelector } from "react-redux";

import Layout from "../../../components/Layout";
import HomePopular from "../../../components/HomePopular";
import HomeMyWave from "../../../components/HomeMyWave";
import JumboText from "../../../components/JumboText";
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
    if (e.target.id === "myWaveRadio") {
      setpopularView(false);
    } else {
      setpopularView(true);
    }
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
            <HomePopular
              genresList={genresList}
              artistsList={artistsList}
              playlistsList={playlistsList}
            />
          ) : (
            <HomeMyWave
              artistsList={artistsList}
              playlistsList={playlistsList}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
