import React from "react";

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
      <div className="row">
        <JumboText priText="My Songs" isNegative />
        <div className="col">
          <Button />
        </div>
        <div className="w-100" />
      </div>
      <div className="row">
        <div className="col-6">
          <h1>Uploaded</h1>
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
        <div className="col-6">
          <h1>Liked</h1>
        </div>
      </div>
    </Layout>
  );
}
