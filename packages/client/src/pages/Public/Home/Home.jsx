/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import homeSearchSchema from "./home-search-schema";

import Layout from "../../../components/Layout";
import Popular from "../../../components/Popular";
import MyWave from "../../../components/MyWave";
import Input from "../../../components/Input";
import RadioButtons from "../../../components/RadioButtons";
import Spinner from "../../../components/Spinner";

// import MusicPlayer from "../../../components/MusicPlayer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [popularView, setpopularView] = useState(true);

  const userState = useSelector((state) => state.user);
  const userFirstName = userState.firstName;

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
        {/* Top part */}
        <div className="d-flex top-part row p-0 m-0 mb-5">
          {loading ? (
            <Spinner isNegative />
          ) : (
            <h1 className="fnt-light fnt-page-title text-break col col-12 col-md-9 pt-3">
              {popularView ? (
                "GENERAL DASHBOARD"
              ) : (
                <div className="d-inline">
                  <p>{`Your dashboard, ${userFirstName}`.toUpperCase()}</p>
                </div>
              )}
            </h1>
          )}

          <div className="col col-12 col-md-3">
            {/* Search bar */}
            <form className=" p-0" onSubmit={formik.handleSubmit}>
              <Input
                id="searchbar"
                name="searchbar"
                placeholder="Search in WaveApp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.searchbar}
                errorMessage={formik.errors.searchbar}
                hasErrorMessage={formik.touched.searchbar}
                isNegative
              />
            </form>

            {/* Popular/MyWave button */}
            <div className="d-flex justify-content-end align-items-center">
              <RadioButtons handleChange={handleChangeView} />
            </div>
          </div>
        </div>

        {/* Bottom part */}
        <div className="row p-0 m-0">
          {/* Switch view */}
          {popularView ? <Popular /> : <MyWave />}
        </div>
      </div>
    </Layout>
  );
}
