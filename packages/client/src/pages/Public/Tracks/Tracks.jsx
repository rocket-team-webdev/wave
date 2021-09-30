import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { PUBLIC } from "../../../constants/routes";

import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import JumboText from "../../../components/JumboText";
import SongCard from "../../../components/SongCard/SongCard";
import { getLikedTracks, getMyTracks } from "../../../api/me-api";

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
                albumId={song.album._id}
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
                albumId={song.album._id}
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
