import React from "react";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import HomeElement from "../../../components/HomeElement";
import Button from "../../../components/Button";

export default function Home() {
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
  ];

  return (
    <Layout>
      <div className="d-flex justify-content-between row p-0 g-4">
        <JumboText secText="Username" isNegative />
        <div className="col col-12 col-md-5 clr-light-20 fx-rounded p-0">
          {/* Genres */}
          <HomeElement label="Genres">
            {/* !!! TODO map genres from user */}
            {genresList.map((genre) => (
              <div key={genre} className="mb-2 me-2">
                <Button isSmall>{genre.toUpperCase()}</Button>
              </div>
            ))}
          </HomeElement>
          {/* Playlists */}
          <HomeElement label="Playlists">
            {/* !!! TODO map genres from user */}
            {genresList.map((genre) => (
              <div key={genre} className="mb-2 me-2">
                <Button isSmall>{genre.toUpperCase()}</Button>
              </div>
            ))}
          </HomeElement>{" "}
        </div>
      </div>
    </Layout>
  );
}
