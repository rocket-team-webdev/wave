import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaPlay, FaEllipsisH } from "react-icons/fa";

import {
  setQueue,
  clearQueue,
  setPlayState,
} from "../../../redux/music-queue/actions";

import { PUBLIC } from "../../../constants/routes";
import { getAlbumById, likeAlbum } from "../../../api/album-api";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import TrackList from "../../../components/TrackList";
import HeartIcon from "../../../components/SVGicons/HeartIcon";

import "./Album.scss";

export default function SinglePlaylist() {
  const [album, setAlbum] = useState({});
  const [tracks, setTracks] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isOwned, setIsOwned] = useState(false);

  const userState = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { albumId } = useRouteMatch(`${PUBLIC.ALBUM}/:albumId`).params;

  const loadAlbum = async () => {
    try {
      const { data } = await getAlbumById(albumId);
      setAlbum(data.data);
      setTracks(data.data.tracks);
      setIsLiked(data.data.isLiked);
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

  const handleFollow = async () => {
    setIsLiked(!isLiked);
    await likeAlbum(albumId);
  };

  const handleIsOwned = () => {
    if (album.userId === userState.mongoId) {
      setIsOwned(true);
    }
  };

  useEffect(() => {
    loadAlbum();
  }, []);

  useEffect(() => {
    handleIsOwned();
  }, [album]);

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        {/* Left side */}
        <div className="col col-12 col-md-6 left-side mt-4">
          <div className="d-flex justify-content-between align-items-start">
            <JumboText priText={album.title} cols="11" isNegative />
            <button
              className="text-center"
              type="button"
              onClick={handleFollow}
            >
              {isLiked ? (
                <HeartIcon isFull isLarge isNegative />
              ) : (
                <HeartIcon isLarge isNegative />
              )}
            </button>
          </div>

          {/* TODO only show creator if exists */}
          <h3 className="fnt-secondary fnt-caption mt-4">
            Created by {album.userId}
          </h3>

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
                  className="ms-3 text-end fnt-light album-ellipsis"
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
                  <Link to={`${PUBLIC.TRACK_EDIT}`}>
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
                    // onClick={handleDeleteSong}
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
