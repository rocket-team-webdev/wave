import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaPlay, FaPause } from "react-icons/fa";
import { setQueue, setPlayState } from "../../../redux/music-queue/actions";

import { PUBLIC } from "../../../constants/routes";
import { getPlaylistById } from "../../../api/playlists-api";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import TrackList from "../../../components/TrackList";

import "./SinglePlaylist.scss";

export default function SinglePlaylist() {
  const [playlist, setPlaylist] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  // const queueState = useSelector((state) => state.queue);
  const dispatch = useDispatch();

  const { playlistId } = useRouteMatch(
    `${PUBLIC.SINGLE_PLAYLIST}/:playlistId`,
  ).params;

  const loadPlaylist = async () => {
    try {
      const { data } = await getPlaylistById(playlistId);
      setPlaylist(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handlePlaying = () => {
    // eslint-disable-next-line prefer-const
    let tracksArray = [];

    playlist.tracks.forEach((track) => {
      const trackObject = {
        name: track.name,
        url: track.url,
        duration: track.duration,
        genreId: track.genreId,
        userId: track.userId,
        artist: track.artist,
        album: track.album.title,
        isLiked: track.isLiked,
        trackId: track._id,
        albumId: track.album._id,
        trackImg: track.album.thumbnail,
      };

      tracksArray.push(trackObject);
    });

    if (isPlaying === false) {
      dispatch(setQueue(tracksArray));
      dispatch(setPlayState(true));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    loadPlaylist();
  }, []);

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row g-4">
        {/* Left side */}
        <div className="col col-12 col-md-6 left-side ps-0">
          <JumboText priText={playlist.name} cols="12" isNegative />
          <button
            type="button"
            onClick={handlePlaying}
            className="play-button clr-light fnt-secondary d-flex justify-content-center align-items-center mt-5"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
        {/* Right side */}
        <div className="col col-12 col-md-6 right-side pe-0">
          <TrackList tracks={playlist.tracks} hasSorter />
        </div>
      </div>
    </Layout>
  );
}
