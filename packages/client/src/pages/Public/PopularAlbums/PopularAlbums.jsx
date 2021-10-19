import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllAlbums } from "../../../api/album-api";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import AlbumList from "../../../components/AlbumList/AlbumList";
import BackButton from "../../../components/BackButton";
import Spinner from "../../../components/Spinner";

export default function PopularAlbums() {
  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState();

  const loadPopularAlbums = async () => {
    try {
      const { data } = await getAllAlbums(0, 10);
      setAlbums(data.albums);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadPopularAlbums();
  }, []);

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        {/* Left side */}
        <div className="col col-12 col-md-6 left-side mt-4">
          <div className="d-flex justify-content-between align-items-start">
            <JumboText priText="Top albums" cols="11" isNegative />
          </div>
          <BackButton isNegative />
        </div>
        {/* Right side */}
        <div className="col col-12 col-md-6 right-side pe-0">
          {!isLoading ? (
            albums && <AlbumList albums={albums} />
          ) : (
            <Spinner isNegative />
          )}
        </div>
      </div>
    </Layout>
  );
}
