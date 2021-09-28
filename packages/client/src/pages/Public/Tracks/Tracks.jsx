import React from "react";

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
        <div className="col-6">
          <h1>Liked</h1>
        </div>
      </div>
    </Layout>
  );
}
