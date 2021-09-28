import React from "react";

import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import JumboText from "../../../components/JumboText";
// import SongCard from "../../../components/SongCard/SongCard";

export default function Songs() {
  return (
    <Layout isNegative>
      <div className="row">
        <JumboText priText="My Songs" isNegative />
        <div className="col">
          <Button />
        </div>
        <div className="w-100" />
      </div>
      <div className="row">
        <div className="col-6">
          {playlistsList.map((songName) => (
            <SongCard key={playlistName} songName={songName} hasHeart />
          ))}
        </div>
        <div className="col-6">
          {playlistsList.map((songName) => (
            <SongCard key={playlistName} songName={songName} hasHeart />
          ))}
        </div>
      </div>
    </Layout>
  );
}
