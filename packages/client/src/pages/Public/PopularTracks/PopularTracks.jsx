import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getAllPlaylists } from "../../../api/playlists-api";
import { PUBLIC } from "../../../constants/routes";
import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import PlaylistList from "../../../components/PlaylistList";
import Button from "../../../components/Button";

export default function PopularTracks() {
  const [playlists, setPlaylists] = useState();

  const loadPopularPlaylists = async () => {
    try {
      const { data } = await getAllPlaylists(0, 12);
      setPlaylists(data.playlists);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  useEffect(() => {
    loadPopularPlaylists();
  }, []);

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        {/* Left side */}
        <div className="col col-12 col-md-6 left-side mt-4">
          <div className="d-flex justify-content-between align-items-start">
            <JumboText priText="Top playlists" cols="11" isNegative />
          </div>
          <Link className="float-start p-0 pt-4" to={PUBLIC.HOME}>
            <Button isNegative>Back</Button>
          </Link>
        </div>
        {/* Right side */}
        <div className="col col-12 col-md-6 right-side pe-0">
          {playlists && <PlaylistList playlists={playlists} />}
        </div>
      </div>
    </Layout>
  );
}
