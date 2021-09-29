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
    songImg:
      "https://images-na.ssl-images-amazon.com/images/I/713j89t%2BDkL._SL1400_.jpg",
    songName: "Glory Box",
    artist: "Portishead",
    albumName: "Dummy",
    time: 134.582857,
  },
  {
    songNumber: 2,
    songImg:
      "https://images-na.ssl-images-amazon.com/images/I/713j89t%2BDkL._SL1400_.jpg",
    songName: "Song 2",
    artist: "Portishead",
    albumName: "Dummy",
    time: 140,
  },
  {
    songNumber: 3,
    songImg:
      "https://images-na.ssl-images-amazon.com/images/I/713j89t%2BDkL._SL1400_.jpg",
    songName: "Song 3",
    artist: "Portishead",
    albumName: "Dummy",
    time: 140,
  },
  {
    songNumber: 4,
    songImg:
      "https://images-na.ssl-images-amazon.com/images/I/713j89t%2BDkL._SL1400_.jpg",
    songName: "Song 4",
    artist: "Portishead",
    albumName: "Dummy",
    time: 140,
  },
];

export default function Songs() {
  return (
    <Layout isNegative>
      <div className="row mb-5">
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
                key={song.songName}
                songNumber={song.songNumber}
                songName={song.songName}
                songImg={song.songImg}
                artist={song.artist}
                albumName={song.albumName}
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
