import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { PUBLIC } from "../../../constants/routes";

import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import JumboText from "../../../components/JumboText";
import SongCard from "../../../components/SongCard/SongCard";
import { getLikedTracks, getMyTracks } from "../../../api/me-api";

// const songs = [
//   {
//     songNumber: 1,
//     songImg:
//       "https://images-na.ssl-images-amazon.com/images/I/713j89t%2BDkL._SL1400_.jpg",
//     songName: "Glory Box",
//     artist: "Portishead",
//     albumName: "Dummy",
//     time: 134.582857,
//   },
//   {
//     songNumber: 2,
//     songImg:
//       "https://images-na.ssl-images-amazon.com/images/I/713j89t%2BDkL._SL1400_.jpg",
//     songName: "Song 2",
//     artist: "Portishead",
//     albumName: "Dummy",
//     time: 140,
//   },
//   {
//     songNumber: 3,
//     songImg:
//       "https://images-na.ssl-images-amazon.com/images/I/713j89t%2BDkL._SL1400_.jpg",
//     songName: "Song 3",
//     artist: "Portishead",
//     albumName: "Dummy",
//     time: 140,
//   },
//   {
//     songNumber: 4,
//     songImg:
//       "https://images-na.ssl-images-amazon.com/images/I/713j89t%2BDkL._SL1400_.jpg",
//     songName: "Song 4",
//     artist: "Portishead",
//     albumName: "Dummy",
//     time: 140,
//   },
// ];

export default function Tracks() {
  const [uploadedSongs, setUploadedSongs] = useState();
  const [likedSongs, setLikedSongs] = useState();

  const fetchUploadedSongs = async () => {
    try {
      const { data } = await getMyTracks();
      setUploadedSongs(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const fetchLikedSongs = async () => {
    try {
      const { data } = await getLikedTracks();
      setLikedSongs(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  useEffect(() => {
    fetchUploadedSongs();
    fetchLikedSongs();
  }, []);
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
          {uploadedSongs &&
            uploadedSongs.map((song, index) => (
              <SongCard
                key={song._id}
                songNumber={index + 1}
                songName={song.name}
                songImg={song.album.thumbnail}
                artist={song.artist}
                albumName={song.album.title}
                time={song.duration}
                songUrl={song.url}
                genreId={song.genreId}
                isLiked={song.isLiked}
                songId={song._id}
                userId={song.userId}
              />
            ))}
        </div>
        <div className="col col-6 ">
          <div className="fnt-page-title">Liked</div>
          {likedSongs &&
            likedSongs.map((song, index) => (
              <SongCard
                key={song._id}
                songNumber={index + 1}
                songName={song.name}
                songImg={song.album.thumbnail}
                artist={song.artist}
                albumName={song.album.title}
                time={song.duration}
                songUrl={song.url}
                genreId={song.genreId}
                isLiked={song.isLiked}
                songId={song._id}
                userId={song.userId}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
}
