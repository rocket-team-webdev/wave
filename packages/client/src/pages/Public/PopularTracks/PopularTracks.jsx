import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { PUBLIC } from "../../../constants/routes";
import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import Button from "../../../components/Button";
import { getAllTracks } from "../../../api/tracks-api";
import TrackList from "../../../components/TrackList";

export default function PopularTracks() {
  const [tracks, setTracks] = useState();

  const loadPopularTracks = async () => {
    try {
      const { data } = await getAllTracks(0, 50);
      setTracks(data.tracks);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  useEffect(() => {
    loadPopularTracks();
  }, []);

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        {/* Left side */}
        <div className="col col-12 col-md-6 left-side mt-4">
          <div className="d-flex justify-content-between align-items-start">
            <JumboText priText="The top 50" cols="11" isNegative />
          </div>
          {/* BACK */}
          <Link className="float-start p-0 pt-4" to={PUBLIC.HOME}>
            <Button isNegative>Back</Button>
          </Link>
        </div>
        {/* Right side */}
        <div className="col col-12 col-md-6 right-side pe-0">
          {tracks && <TrackList tracks={tracks} />}
        </div>
      </div>
    </Layout>
  );
}
