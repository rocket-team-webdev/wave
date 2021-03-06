import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { getAllPlaylists } from "../../../api/playlists-api";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import PlaylistList from "../../../components/PlaylistList";

import BackButton from "../../../components/BackButton";
import Spinner from "../../../components/Spinner";

export default function PopularPlaylists() {
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState();

  const loadPopularPlaylists = async () => {
    try {
      const { data } = await getAllPlaylists(0, 10);
      setPlaylists(data.playlists);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadPopularPlaylists();
  }, []);

  return (
    <Layout docTitle="Top playlists" isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        {/* Left side */}
        <div className="col col-12 col-md-6 left-side mt-4 px-4 p-md-0">
          <div className="d-flex justify-content-between align-items-start">
            <JumboText priText="Top playlists" cols="11" isNegative />
          </div>
          <BackButton classNames="mt-5" isNegative />
        </div>
        {/* Right side */}
        <div className="col col-12 col-md-6 right-side pe-0">
          {!isLoading ? (
            playlists && <PlaylistList playlists={playlists} />
          ) : (
            <Spinner isNegative />
          )}
        </div>
      </div>
    </Layout>
  );
}
