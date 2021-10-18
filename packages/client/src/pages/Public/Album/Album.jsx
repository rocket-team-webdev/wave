import React, { useState, useEffect } from "react";
import { useRouteMatch, Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaHeart, FaPlay, FaEllipsisH, FaMusic } from "react-icons/fa";

import {
  setQueue,
  clearQueue,
  setPlayState,
} from "../../../redux/music-queue/actions";

import { PUBLIC } from "../../../constants/routes";
import { getAlbumById, likeAlbum, deleteAlbum } from "../../../api/album-api";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import TrackList from "../../../components/TrackList";
import HeartIcon from "../../../components/SVGicons/HeartIcon";

import "./Album.scss";
import { uniqueValuesArray } from "../../../utils/arrayFunctions";
import GenreCard from "../../../components/GenreCard";
import DeleteModal from "../../../components/DeleteModal";
import BackButton from "../../../components/BackButton";

export default function Album() {
  const history = useHistory();
  const location = useLocation();

  const [album, setAlbum] = useState({});
  const [tracks, setTracks] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCounter, setLikesCounter] = useState(0);
  const [isOwned, setIsOwned] = useState(false);
  const [albumGenres, setAlbumGenres] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const userState = useSelector((state) => state.user);
  const queueState = useSelector((state) => state.queue);

  const dispatch = useDispatch();

  const { albumId } = useRouteMatch(`${PUBLIC.ALBUM}/:albumId`).params;

  const handleIsOwned = (userId) => {
    if (userId === userState.mongoId) {
      setIsOwned(true);
    }
  };

  const getGenresFromTracks = (tracksArray) => {
    const genres = [];
    tracksArray.map((track) => genres.push(track.genreId));
    const cleanedGenres = uniqueValuesArray(genres);
    setAlbumGenres(cleanedGenres);
  };

  const loadAlbum = async () => {
    try {
      const { data } = await getAlbumById(albumId);
      setAlbum(data.data);
      setTracks(data.data.tracks);
      getGenresFromTracks(data.data.tracks);
      setIsLiked(data.data.isLiked);
      setLikesCounter(data.data.likes);
      handleIsOwned(data.data.userId._id);
    } catch (error) {
      if (error.response.status === 500) {
        toast("Album not found", {
          type: "error",
        });
        history.push(PUBLIC.NOT_FOUND);
      } else {
        toast(error.message, { type: "error" });
      }
    }
  };

  const handlePlaying = () => {
    if (tracks.length > 0) {
      // eslint-disable-next-line no-debugger
      // debugger;
      setIsPlaying(true);
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
    } else {
      toast("Album empty, please add a song!", { type: "error" });
    }
  };

  const handleLike = async () => {
    if (!isLiked) setLikesCounter(likesCounter + 1);
    if (isLiked) setLikesCounter(likesCounter - 1);
    setIsLiked(!isLiked);
    await likeAlbum(albumId);
  };

  const handleDeleteAlbum = async () => {
    try {
      await deleteAlbum(albumId);
      history.push(PUBLIC.ALBUMS);
      return toast("Album deleted!", { type: "success" });
    } catch (error) {
      return toast("Error deleting album", { type: "error" });
    }
  };

  useEffect(() => {
    loadAlbum();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (queueState.queue.length === 0) setIsPlaying(false);
  }, [queueState]);

  return (
    <Layout thumbnailUrl={album.thumbnail}>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        {/* Left side */}
        <div className="col col-12 col-md-6 left-side mt-4">
          <div className="d-flex justify-content-between align-items-start row">
            <div className="col col-10">
              <JumboText priText={album.title} cols="12" isNegative />
            </div>
            <div className="d-flex justify-content-end col col-1">
              <button
                className="text-center"
                type="button"
                onClick={handleLike}
              >
                {isLiked ? (
                  <HeartIcon isFull isLarge isNegative />
                ) : (
                  <HeartIcon isLarge isNegative />
                )}
              </button>
            </div>
          </div>
          <div className="d-flex align-items-start mt-4">
            {albumGenres.map((genre) => (
              <div key={genre._id} className="mb-2 me-2">
                <GenreCard>{genre.name.toUpperCase()}</GenreCard>
              </div>
            ))}
          </div>
          <h3 className="fnt-subtitle-light fnt-light mt-2 w-fit-content">
            {album.year}
          </h3>
          {/* TODO only show creator if exists */}
          {album.userId && (
            <h3 className="fnt-light fnt-caption mt-4 d-flex align-items-center">
              <p className="mb-0">Created by </p>
              <Link
                to={{
                  pathname: `${PUBLIC.USERS}/${album.userId._id}`,
                  state: {
                    referrer: location.pathname,
                  },
                }}
              >
                <p className="mb-0 ms-1">{album.userId.firstName}</p>
              </Link>
            </h3>
          )}
          <h3 className="fnt-light fnt-caption d-flex align-items-center">
            <FaHeart />
            <p className="ms-2 mb-0">{likesCounter} likes</p>
          </h3>
          <div className="col-12 p-0 mt-4">
            <BackButton classNames="me-3" isNegative />
          </div>
          <div className="d-flex align-items-center mt-5">
            <button
              type="button"
              onClick={handlePlaying}
              disabled={isPlaying}
              className="play-button clr-light fnt-secondary d-flex justify-content-center align-items-center"
            >
              {isPlaying ? <FaMusic /> : <FaPlay />}
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
                  <Link
                    to={{
                      pathname: `${PUBLIC.UPDATE_ALBUM}/${album._id}`,
                      state: {
                        referrer: location.pathname,
                      },
                    }}
                  >
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
                    data-bs-toggle="modal"
                    data-bs-target="#deleteAlbumModal"
                    type="button"
                    // onClick={handleDeleteAlbum}
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
        <DeleteModal
          id="deleteAlbumModal"
          modalTitle="Removing Album"
          modalBody={`Are you sure you want to delete ${album.title}?`}
          handleSubmit={handleDeleteAlbum}
        />
      </div>
    </Layout>
  );
}
