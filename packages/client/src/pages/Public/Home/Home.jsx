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
import Spinner from "../../../components/Spinner";

// import MusicPlayer from "../../../components/MusicPlayer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [popularView, setpopularView] = useState(true);

  const userState = useSelector((state) => state.user);
  const userFirstName = userState.firstName;

  const artistsList = [
    "Chet Baker",
    "Red Hot Chili Peppers",
    "Fatboy Slim",
    "Arctic Monkeys",
    "Last Shadow Puppets",
  ];

  const formik = useFormik({
    initialValues: {
      searchBar: "",
    },
    validationSchema: homeSearchSchema,
    onSubmit: () => {
      setLoading(true);
      setLoading(false);
    },
  });

  // Personal/MyWave
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
          <JumboText secText={userFirstName} cols="12" isNegative isAnimated />
          <form className="my-5" onSubmit={formik.handleSubmit}>
            <Input
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
          {loading && <Spinner isNegative />}
        </div>
        <div className="col col-12 col-md-5 container-fluid mx-0">
          {/* Popular/MyWave */}
          <div className="d-flex justify-content-end align-items-center mb-5">
            <RadioButtons handleChange={handleChangeView} />
          </div>
          {/* Switch view */}
          {popularView ? (
            <HomePopular artistsList={artistsList} />
          ) : (
            <HomeMyWave artistsList={artistsList} />
          )}
        </div>
      </div>
    </Layout>
  );
}
