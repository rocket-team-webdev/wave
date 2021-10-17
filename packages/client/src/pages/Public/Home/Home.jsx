/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

import { fromBottom } from "../../../utils/motionSettings";

import homeSearchSchema from "./home-search-schema";

import Layout from "../../../components/Layout";
import PopularWave from "../../../components/PopularWave";
import MyWave from "../../../components/MyWave";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import RadioButtons from "../../../components/RadioButtons";
import Spinner from "../../../components/Spinner";
import { PUBLIC } from "../../../constants/routes";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [popularView, setpopularView] = useState(true);
  const userState = useSelector((state) => state.user);
  const userFirstName = userState.firstName;
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      searchBar: "",
    },
    validationSchema: homeSearchSchema,
    onSubmit: (formikState) => {
      console.log(formikState);
      history.push(`${PUBLIC.SEARCH}?q=${formikState.searchBar}`);
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
            <motion.h1
              className="fnt-light fnt-page-title text-break col col-12 col-md-9 pt-3 truncate"
              variants={fromBottom}
              initial="hidden"
              animate="visible"
            >
              {popularView ? (
                "GENERAL DASHBOARD"
              ) : (
                <div className="d-inline">
                  <motion.p
                    variants={fromBottom}
                    initial="hidden"
                    animate="visible"
                  >
                    {`Your dashboard, ${userFirstName}`.toUpperCase()}
                  </motion.p>
                </div>
              )}
            </motion.h1>
          )}

          <div className="col col-12 col-md-3">
            {/* Search bar */}
            <form
              className="row d-flex align-items-center justify-content-end"
              onSubmit={formik.handleSubmit}
            >
              <Input
                id="searchBar"
                name="searchBar"
                placeholder="Search in WaveApp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.searchBar}
                errorMessage={formik.errors.searchBar}
                hasErrorMessage={formik.touched.searchBar}
                classNames="col-8 col-md-9"
                isNegative
              />
              <div className="col-4 col-md-3 mb-2">
                <div className="mb-1 w-100">
                  <Button submitButton isNegative>
                    <IconContext.Provider
                      value={{
                        style: { fontSize: 18, margin: 4 },
                      }}
                    >
                      <FaSearch />
                    </IconContext.Provider>
                  </Button>
                </div>
              </div>
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
          {popularView ? <PopularWave /> : <MyWave />}
        </div>
      </div>
    </Layout>
  );
}
