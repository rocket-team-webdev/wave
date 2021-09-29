import React from "react";
import { Link } from "react-router-dom";
import { PUBLIC } from "../../../constants/routes";

import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import JumboText from "../../../components/JumboText";
import SongCard from "../../../components/SongCard/SongCard";

const songs = [
  {
    songNumber: 1,
    songImg: "",
    songName: "Glory Box",
    artist: "Portishead",
    albumName: "Dummy",
    time: "3:45",
  },
  {
    songNumber: 2,
    songImg: "",
    songName: "Song 2",
    artist: "Portishead",
    albumName: "Dummy",
    time: "3:45",
  },
  {
    songNumber: 3,
    songImg: "",
    songName: "Song 3",
    artist: "Portishead",
    albumName: "Dummy",
    time: "3:45",
  },
  {
    songNumber: 4,
    songImg: "",
    songName: "Song 4",
    artist: "Portishead",
    albumName: "Dummy",
    time: "3:45",
  },
];

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
          {songs &&
            songs.map((song) => (
              <SongCard
                key={song._id}
                songNumber={song.songNumber}
                songName={song.songName}
                songImg={song.songImg}
                groupName={song.groupName}
                artist={song.albumName}
                time={song.time}
              />
            ))}
        </div>
        <div className="col col-6 ">
          <div className="fnt-page-title">Liked</div>
        </div>
      </div>
    </Layout>
  );
}
