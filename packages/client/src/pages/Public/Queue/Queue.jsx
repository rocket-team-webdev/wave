import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { MdClose } from "react-icons/md";

import { PUBLIC } from "../../../constants/routes";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import TrackList from "../../../components/TrackList";
import Button from "../../../components/Button";

import {
  // setQueue,
  clearQueue,
  // setPlayState,
} from "../../../redux/music-queue/actions";

import "./Queue.scss";

export default function Queue() {
  // const [playlist, setPlaylist] = useState({});
  const [tracks, setTracks] = useState([]);

  // const userState = useSelector((state) => state.user);
  const queueState = useSelector((state) => state.queue);

  const dispatch = useDispatch();
  const history = useHistory();

  const loadQueue = async () => {
    try {
      const queue = queueState.queue;
      const tracksArray = [];
      queue.forEach((track) => {
        const trackObject = {
          _id: track.trackId,
          name: track.name,
          artist: track.artist,
          url: track.url,
          duration: track.duration,
          userId: track.userId,
          album: {
            _id: track.albumId,
            thumbnail: track.trackImg,
            title: track.album,
          },
          genreId: {
            _id: track.genreId,
            name: "genre",
          },
          likes: 2,
          isLiked: track.isLiked,
        };
        tracksArray.push(trackObject);
      });
      setTracks(tracksArray);
    } catch (error) {
      if (error.response.status === 500) {
        toast("Playlist not found", { type: "error" });
        history.push(PUBLIC.NOT_FOUND);
      } else {
        toast(error.message, { type: "error" });
      }
    }
  };

  const handleCloseQueue = () => {
    history.goBack();
  };

  const handleClearQueue = () => {
    dispatch(clearQueue());
    // history.goBack();
  };

  useEffect(() => {
    loadQueue();
  }, [queueState.queue]);

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        {/* Left side */}
        <div className="col col-12 col-md-4 left-side mt-4">
          <div className="d-flex justify-content-between align-items-start">
            <JumboText priText="Queue" cols="11" isNegative />
          </div>
          <div className="mt-5" />
          <Button handleClick={handleClearQueue} isDanger>
            Clear queue
          </Button>
        </div>
        {/* Right side */}
        <div className="col col-12 col-md-8 right-side pe-0">
          <TrackList
            tracks={tracks}
            setTracks={setTracks}
            hasSorter
            isOnQueue
            isOnPlaylist
          />
        </div>
      </div>
      <button type="button" className="close-button" onClick={handleCloseQueue}>
        <MdClose />
      </button>
    </Layout>
  );
}
