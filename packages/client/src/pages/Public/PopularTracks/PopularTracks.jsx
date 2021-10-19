import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";

import { getAllTracks } from "../../../api/tracks-api";
import TrackList from "../../../components/TrackList";
import BackButton from "../../../components/BackButton";

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
        <div className="col col-12 col-md-6 left-side mt-4 px-4 p-md-0">
          <div className="d-flex justify-content-between align-items-start">
            <JumboText priText="The top 50" cols="11" isNegative />
          </div>

          <BackButton classNames="mt-5" isNegative />
        </div>
        {/* Right side */}
        <div className="col col-12 col-md-6 right-side pe-0">
          {tracks && <TrackList tracks={tracks} />}
        </div>
      </div>
    </Layout>
  );
}
