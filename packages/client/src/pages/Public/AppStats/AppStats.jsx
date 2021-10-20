import React, { useEffect, useState } from "react";

import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";
import AccountSideBar from "../../../components/AccountSideBar";
import FormWrapper from "../../../components/FormWrapper";
import Chart from "../../../components/Chart";
import { getAllTracks } from "../../../api/tracks-api";
import { getAllGenres } from "../../../api/genre-api";

export default function AppStats() {
  const [loadStatus, setLoadStatus] = useState(false);
  const [topSongs, setTopSongs] = useState([]);
  const [topGenres, setTopGenres] = useState([]);

  const config = {
    backgroundColor: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(255, 159, 64, 0.2)",
      "rgba(255, 205, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(54, 162, 235, 0.2)",
    ],
    borderColor: [
      "rgb(255, 99, 132)",
      "rgb(255, 159, 64)",
      "rgb(255, 205, 86)",
      "rgb(75, 192, 192)",
      "rgb(54, 162, 235)",
    ],
    borderWidth: 1,
  };

  useEffect(async () => {
    const { data } = await getAllTracks();
    setTopSongs({
      labels: data.tracks.map((song) => song.name),
      datasets: [
        {
          label: "Popularity",
          data: data.tracks.map((song) => song.popularity),
          ...config,
        },
      ],
    });

    const { data: genreData } = await getAllGenres(0, 5);
    setTopGenres({
      labels: genreData.genres.map((genre) => genre.name),
      datasets: [
        {
          label: "Popularity",
          data: genreData.genres.map((genre) => genre.popularity),
          ...config,
        },
      ],
    });

    setLoadStatus(true);
  }, []);

  return (
    <Layout docTitle="App stats">
      <div className="row p-0 m-0 col col-12 pb-5 pb-sm-0">
        <div className="col col-12 col-lg-6 ps-3 ps-sm-0">
          <AccountSideBar />
        </div>

        <div className="col col-12 col-lg-6 pe-3 pe-sm-0">
          <FormWrapper formTitle="Stats">
            {!loadStatus && (
              <div className="col d-flex justify-content-end">
                <Spinner />
              </div>
            )}

            {loadStatus && (
              <>
                <Chart
                  chartData={topSongs}
                  title="Top reproduced songs"
                  // horizontal
                />
                <Chart
                  chartData={topGenres}
                  title="Top reproduced genres"
                  type="pie"
                />
              </>
            )}
          </FormWrapper>
        </div>
      </div>
    </Layout>
  );
}
