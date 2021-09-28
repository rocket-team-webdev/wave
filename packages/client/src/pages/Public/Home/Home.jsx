import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import homeSearchSchema from "./home-search-schema";

import Layout from "../../../components/Layout";
import HomePopular from "../../../components/HomePopular";
import HomeMyWave from "../../../components/HomeMyWave";
import JumboText from "../../../components/JumboText";
import Input from "../../../components/Input";
import RadioButtons from "../../../components/RadioButtons";

export default function Home() {
  const [loading, setLoading] = useState(false);
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
    "Last Shadow Puppets",
    "The Who",
    "Idles",
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

  const formik = useFormik({
    initialValues: {
      searchbar: "",
    },
    validationSchema: homeSearchSchema,
    onSubmit: (searchState) => {
      setLoading(true);
      console.log("Submitted search!");
      console.log(searchState.searchbar);
      setLoading(false);
    },
  });

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        <div className="col col-12 col-md-6 p-0 left-side">
          <JumboText secText={userFirstName} cols="12" isNegative />
          <form className="my-5" onSubmit={formik.handleSubmit}>
            <Input
              // label="email"
              id="searchbar"
              name="searchbar"
              placeholder="Search"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.searchbar}
              errorMessage={formik.errors.searchbar}
              hasErrorMessage={formik.touched.searchbar}
              classNames="col col-12 col-md-6"
              isNegative
            />
          </form>
          {loading && <h3>Loading...</h3>}
        </div>
        <div className="col col-12 col-md-5 fx-rounded p-0">
          {/* Popular/MyWave */}
          <div className="d-flex justify-content-between align-items-center mb-5">
            <p className="fnt-label-bold fnt-light">App view</p>
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
