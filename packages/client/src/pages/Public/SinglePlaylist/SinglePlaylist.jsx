import React, { useState, useEffect } from "react";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaPlay, FaEllipsisH } from "react-icons/fa";

import {
  setQueue,
  clearQueue,
  setPlayState,
} from "../../../redux/music-queue/actions";

import { PUBLIC } from "../../../constants/routes";
import {
  getPlaylistById,
  deletePlaylist,
  followPlaylist,
} from "../../../api/playlists-api";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import TrackList from "../../../components/TrackList";
import HeartIcon from "../../../components/SVGicons/HeartIcon";

import "./SinglePlaylist.scss";

export default function SinglePlaylist() {
  const [playlist, setPlaylist] = useState({});
  const [tracks, setTracks] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isOwned, setIsOwned] = useState(false);

  const userState = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const { playlistId } = useRouteMatch(
    `${PUBLIC.SINGLE_PLAYLIST}/:playlistId`,
  ).params;

  const handleIsOwned = (userId) => {
    if (userId === userState.mongoId) {
      setIsOwned(true);
    }
  };

  const loadPlaylist = async () => {
    try {
      const { data } = await getPlaylistById(playlistId);
      setPlaylist(data.data);
      console.log(data.data.userId.firstName);
      setTracks(data.data.tracks);
      setIsFollowed(data.data.isFollowed);
      handleIsOwned(data.data.userId);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handlePlaying = () => {
    dispatch(clearQueue());
    const tracksArray = [];

    tracks.forEach((track) => {
      const trackObject = {
        name: track.name,
        url: track.url,
        duration: track.duration,
        genreId: track.genreId,
        userId: track.userId._id,
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

  const handleFollow = async () => {
    setIsFollowed(!isFollowed);
    await followPlaylist(playlistId);
  };

  const handleDeletePlaylist = async () => {
    await deletePlaylist(playlistId);
    history.push(PUBLIC.MY_PLAYLISTS);
    // updateDeletedView(trackId);
  };

  useEffect(() => {
    loadPlaylist();
  }, []);

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        {/* Left side */}
        <div className="col col-12 col-md-6 left-side mt-4">
          <div className="d-flex justify-content-between align-items-start">
            <JumboText priText={playlist.name} cols="11" isNegative />
            <button
              className="text-center"
              type="button"
              onClick={handleFollow}
            >
              {isFollowed ? (
                <HeartIcon isFull isLarge isNegative />
              ) : (
                <HeartIcon isLarge isNegative />
              )}
            </button>
          </div>

          {/* TODO only show creator if exists */}
          <h3 className="fnt-secondary fnt-caption mt-4">
            Created by {playlist.userId.firstName}
          </h3>
          <h3 className="fnt-secondary fnt-caption d-flex align-items-center">
            <HeartIcon isFull />{" "}
            <p className="ms-2 mb-0">{playlist.follows} followers</p>
          </h3>
          {playlist.description !== "" && (
            <p className="fnt-secondary fnt-smallest mt-4">
              {playlist.description}
            </p>
          )}
          <div className="d-flex align-items-center mt-5">
            <button
              type="button"
              onClick={handlePlaying}
              className="play-button clr-light fnt-secondary d-flex justify-content-center align-items-center"
            >
              <FaPlay />
            </button>
            {/* Dropdown menu if user is owner */}
            {isOwned && (
              <>
                <button
                  className="ms-3 text-end fnt-light playlist-ellipsis"
                  type="button"
                  id="contextPlaylistMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaEllipsisH />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end clr-secondary p-1"
                  aria-labelledby="contextSongMenu"
                >
                  <Link to={`${PUBLIC.PLAYLIST_UPDATE}/${playlistId}`}>
                    <p
                      className="dropdown-item fnt-light fnt-song-regular m-0"
                      type="button"
                    >
                      Edit
                    </p>
                  </Link>
                  <hr className="dropdown-wrapper m-0" />
                  <button
                    className="dropdown-item fnt-light fnt-song-regular"
                    type="button"
                    onClick={handleDeletePlaylist}
                  >
                    Delete
                  </button>
                </ul>
              </>
            )}
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
