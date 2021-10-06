import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaPlay } from "react-icons/fa";

import {
  setQueue,
  clearQueue,
  setPlayState,
} from "../../../redux/music-queue/actions";

import { PUBLIC } from "../../../constants/routes";
import { getPlaylistById } from "../../../api/playlists-api";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import TrackList from "../../../components/TrackList";
import HeartIcon from "../../../components/SVGicons/HeartIcon";

import "./SinglePlaylist.scss";

export default function SinglePlaylist() {
  const [playlist, setPlaylist] = useState({});
  const [tracks, setTracks] = useState([]);
  // const [isLiked, setIsLiked] = useState(false)
  // const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();

  const { playlistId } = useRouteMatch(
    `${PUBLIC.SINGLE_PLAYLIST}/:playlistId`,
  ).params;

  const loadPlaylist = async () => {
    try {
      const { data } = await getPlaylistById(playlistId);
      setPlaylist(data.data);
      setTracks(data.data.tracks);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handlePlaying = () => {
    dispatch(clearQueue());
    // eslint-disable-next-line prefer-const
    let tracksArray = [];

    tracks.forEach((track) => {
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

    dispatch(setQueue(tracksArray));
    dispatch(setPlayState(true));
  };

  // const handleLike = async () => {};

  useEffect(() => {
    loadPlaylist();
  }, []);

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        {/* Left side */}
        <div className="col col-12 col-md-6 row left-side mt-4">
          <div className="d-flex justify-content-between">
            <JumboText priText={playlist.name} cols="11" isNegative />
            <button
              className="text-center"
              type="button"
              /* onClick={handleLike} */
            >
              {/* {isLiked ? <HeartIcon isFull /> : <HeartIcon />} */}
            </button>
            <HeartIcon isLarge isNegative />
          </div>

          {/* TODO only show creator if exists */}
          <h3 className="fnt-secondary fnt-caption mt-4">Created by</h3>

          {playlist.description && (
            <p className="fnt-secondary fnt-smallest mt-4">
              {playlist.description}
            </p>
          )}
          <div className="mt-5">
            <button
              type="button"
              onClick={handlePlaying}
              className="play-button clr-light fnt-secondary d-flex justify-content-center align-items-center"
            >
              <FaPlay />
            </button>
          </div>
        </div>
        {/* Right side */}
        <div className="col col-12 col-md-6 right-side pe-0">
          <TrackList tracks={tracks} setTracks={setTracks} hasSorter />
        </div>
      </div>
    </Layout>
  );
}
