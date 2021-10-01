import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { PUBLIC } from "../../../constants/routes";

import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import JumboText from "../../../components/JumboText";
import TrackCard from "../../../components/TrackCard";
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

  // console.log("Se ha hecho like", uploadedSongs);

  const fetchLikedSongs = async () => {
    try {
      const { data } = await getLikedTracks();
      setLikedSongs(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleAddLikedColumn = (song, liked) => {
    try {
      if (liked) {
        const updatedUploadedSongs = uploadedSongs.map((bySong) => {
          if (bySong._id === song._id) return { ...bySong, isLiked: liked };
          return bySong;
        });
        setLikedSongs((prevSongs) => [...prevSongs, song]);
        setUploadedSongs(updatedUploadedSongs);
      } else {
        const updatedLikedSongs = likedSongs.filter((v) => v._id !== song._id);
        const updatedUploadedSongs = uploadedSongs.map((bySong) => {
          if (bySong._id === song._id) return { ...bySong, isLiked: liked };
          return bySong;
        });
        setLikedSongs(updatedLikedSongs);
        setUploadedSongs(updatedUploadedSongs);
      }
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
              <TrackCard
                key={song._id}
                trackNumber={index + 1}
                trackName={song.name}
                trackImg={song.album.thumbnail}
                artist={song.artist}
                albumName={song.album.title}
                time={song.duration}
                trackUrl={song.url}
                albumId={song.album._id}
                genreId={song.genreId}
                isLiked={song.isLiked}
                trackId={song._id}
                userId={song.userId}
                updateLikedView={handleAddLikedColumn}
              />
            ))}
        </div>
        <div className="col col-6 ">
          <div className="fnt-page-title">Liked</div>
          {likedSongs &&
            likedSongs.map((song, index) => (
              <TrackCard
                key={song._id}
                trackNumber={index + 1}
                trackName={song.name}
                trackImg={song.album.thumbnail}
                artist={song.artist}
                albumName={song.album.title}
                time={song.duration}
                trackUrl={song.url}
                albumId={song.album._id}
                genreId={song.genreId}
                isLiked={song.isLiked}
                trackId={song._id}
                userId={song.userId}
                updateLikedView={handleAddLikedColumn}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
}
