import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllAlbums } from "../../../api/album-api";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import AlbumList from "../../../components/AlbumList/AlbumList";
import BackButton from "../../../components/BackButton";

export default function PopularAlbums() {
  const [albums, setAlbums] = useState();

  const loadPopularAlbums = async () => {
    try {
      const { data } = await getAllAlbums(0, 10);
      setAlbums(data.albums);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  useEffect(() => {
    loadPopularAlbums();
  }, []);

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        {/* Left side */}
        <div className="col col-12 col-md-6 left-side mt-4 px-4 p-md-0">
          <div className="d-flex justify-content-between align-items-start">
            <JumboText priText="Top albums" cols="11" isNegative />
          </div>
          <BackButton classNames="mt-5" isNegative />
        </div>
        {/* Right side */}
        <div className="col col-12 col-md-6 right-side pe-0">
          {albums && <AlbumList albums={albums} />}
        </div>
      </div>
    </Layout>
  );
}
