import React, { useEffect, useState } from "react";

import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";
import AccountSideBar from "../../../components/AccountSideBar";
import FormWrapper from "../../../components/FormWrapper";
import Chart from "../../../components/Chart";
import { getAllTracks } from "../../../api/tracks-api";

export default function AppStats() {
  // const history = useHistory();
  const [loadStatus, setLoadStatus] = useState(false);
  const [topSongs, setTopSongs] = useState([]);

  useEffect(async () => {
    const { data } = await getAllTracks();

    setTopSongs({
      labels: data.tracks.map((song) => song.name),
      datasets: [
        {
          label: "Popularity",
          data: data.tracks.map((song) => song.popularity),
          backgroundColor: [
            // "#ffbb11",
            // "#ecf0f1",
            // "#50AF95",
            // "#f3ba2f",
            // "#2a71d0",
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
        },
      ],
    });

    setLoadStatus(true);
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-12 col-lg-6 pt-2">
          <AccountSideBar />
        </div>

        <div className="col-12 col-lg-6">
          <FormWrapper formTitle="App stats">
            {!loadStatus && (
              <div className="col d-flex justify-content-end">
                <Spinner />
              </div>
            )}

            {loadStatus && (
              <Chart chartData={topSongs} title="Top reproduced songs" />
            )}
          </FormWrapper>
        </div>
      </div>
    </Layout>
  );
}
