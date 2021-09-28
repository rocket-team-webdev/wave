import React from "react";
import { Link } from "react-router-dom";
import { PUBLIC } from "../../../constants/routes";

import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import JumboText from "../../../components/JumboText";
// import SongCard from "../../../components/SongCard/SongCard";

export default function Songs() {
  return (
    <Layout isNegative>
      <div className="row">
        <div className="col col-9">
          <JumboText priText="My Songs" isNegative />
        </div>
        <div className="col col-3">
          <Link className="float-end p-3" to={PUBLIC.TRACK_UPLOAD}>
            <Button isNegative>Upload</Button>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col col-6 ">
          <div className="fnt-page-title">Uploaded</div>
          {/* <div className="">
          {playlistsList.map((songName) => (
            <SongCard key={songName} songName={songName} hasHeart />
          ))}
        </div> */}
        </div>
        <div className="col col-6 ">
          <div className="fnt-page-title">Uploaded</div>
          {/* <div className="">
          {playlistsList.map((songName) => (
            <SongCard key={songName} songName={songName} hasHeart />
          ))}
        </div> */}
        </div>
      </div>
    </Layout>
  );
}
