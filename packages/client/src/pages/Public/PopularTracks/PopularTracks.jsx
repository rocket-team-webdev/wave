import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";

import { getAllTracks } from "../../../api/tracks-api";
import TrackList from "../../../components/TrackList";
import BackButton from "../../../components/BackButton";
import Spinner from "../../../components/Spinner";

export default function PopularTracks() {
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState();

  const loadPopularTracks = async () => {
    try {
      const { data } = await getAllTracks(0, 50);
      setTracks(data.tracks);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadPopularTracks();
  }, []);

  return (
    <Layout docTitle="Top tracks" isNegative>
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
          {!isLoading ? (
            tracks && <TrackList tracks={tracks} />
          ) : (
            <Spinner isNegative />
          )}
        </div>
      </div>
    </Layout>
  );
}
