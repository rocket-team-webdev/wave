import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import JumboText from "../../../components/JumboText";
import TrackList from "../../../components/TrackList";
import { getLikedTracks, getMyTracks } from "../../../api/me-api";
import { PUBLIC } from "../../../constants/routes";

export default function Tracks() {
  const [uploadedSongs, setUploadedSongs] = useState();
  const [likedSongs, setLikedSongs] = useState();
  const [loaded, setLoaded] = useState(false);

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

  const handleAddLikedColumn = (song, liked) => {
    setLoaded(false);
    try {
      if (liked) {
        const updatedUploadedSongs = uploadedSongs.map((bySong) => {
          if (bySong._id === song._id) return { ...bySong, isLiked: liked };
          return bySong;
        });
        setLikedSongs((prevSongs) => [...prevSongs, song]);
        setUploadedSongs(updatedUploadedSongs);
        setLoaded(true);
      } else {
        const updatedLikedSongs = likedSongs.filter((v) => v._id !== song._id);
        const updatedUploadedSongs = uploadedSongs.map((bySong) => {
          if (bySong._id === song._id) return { ...bySong, isLiked: liked };
          return bySong;
        });
        setLikedSongs(updatedLikedSongs);
        setUploadedSongs(updatedUploadedSongs);
        setLoaded(true);
      }
    } catch (error) {
      toast(error.message, { type: "error" });
      setLoaded(true);
    }
  };

  useEffect(() => {
    fetchUploadedSongs();
    fetchLikedSongs();
    setLoaded(true);
  }, []);

  return (
    <Layout isNegative>
      <div className="row mb-5">
        <div className="col col-9">
          <JumboText priText="My Songs" cols="12" isNegative />
        </div>
        <div className="col col-3">
          <Link className="float-end p-3" to={PUBLIC.TRACK_UPLOAD}>
            <Button isNegative>Upload</Button>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Uploaded</div>
          {loaded && uploadedSongs && (
            <TrackList
              tracks={uploadedSongs}
              onAddLikedColumn={handleAddLikedColumn}
              draggable
            />
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Liked</div>
          {loaded && likedSongs && (
            <TrackList
              tracks={likedSongs}
              onAddLikedColumn={handleAddLikedColumn}
              draggable
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
