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
  followPlaylist,
  deletePlaylist,
} from "../../../api/playlists-api";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import TrackList from "../../../components/TrackList";
import HeartIcon from "../../../components/SVGicons/HeartIcon";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

import "./SinglePlaylist.scss";
import GenreCard from "../../../components/GenreCard";
import { uniqueValuesArray } from "../../../utils/arrayFunctions";

export default function SinglePlaylist() {
  const [playlist, setPlaylist] = useState({});
  const [tracks, setTracks] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [followersCounter, setFollowersCounter] = useState(0);
  const [playlistGenres, setPlaylistGenres] = useState([]);

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

  const getGenresFromTracks = (tracksArray) => {
    const genres = [];
    tracksArray.map((track) => genres.push(track.genreId));
    const cleanedGenres = uniqueValuesArray(genres);
    setPlaylistGenres(cleanedGenres);
  };

  const loadPlaylist = async () => {
    try {
      const { data } = await getPlaylistById(playlistId);
      setPlaylist(data.data);
      setTracks(data.data.tracks);
      getGenresFromTracks(data.data.tracks);
      setIsFollowed(data.data.isFollowed);
      setFollowersCounter(data.data.follows);
      handleIsOwned(data.data.userId._id);
    } catch (error) {
      if (error.response.status === 500) {
        toast("Playlist not found", { type: "error" });
        history.push(PUBLIC.NOT_FOUND);
      } else {
        toast(error.message, { type: "error" });
      }
    }
  };

  const handlePlaying = () => {
    if (tracks.length > 0) {
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
      toast("Playlist empty, please add a song!", { type: "error" });
    }
  };

  const handleFollow = async () => {
    if (!isFollowed) setFollowersCounter(followersCounter + 1);
    if (isFollowed) setFollowersCounter(followersCounter - 1);
    setIsFollowed(!isFollowed);
    await followPlaylist(playlistId);
  };

  const handleDeletePlaylist = async () => {
    try {
      await deletePlaylist(playlistId);
      history.push(PUBLIC.MY_PLAYLISTS);
      return toast("Playlist deleted!", { type: "success" });
    } catch (error) {
      return toast("Error deleting playlist", { type: "error" });
    }
  };

  useEffect(() => {
    loadPlaylist();
    setIsFollowed(playlist.isFollowed);
  }, []);

  return (
    <Layout thumbnailUrl={playlist.thumbnail}>
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
          <div className="d-flex align-items-start mt-4">
            {playlistGenres.map((genre) => (
              <div key={genre._id} className="mb-2 me-2">
                <GenreCard>{genre.name.toUpperCase()}</GenreCard>
              </div>
            ))}
          </div>

          {/* TODO only show creator if exists */}
          {playlist.userId && (
            <h3 className="fnt-light fnt-caption mt-4 d-flex align-items-center">
              <p className="mb-0">Created by </p>
              <Link to={`${PUBLIC.USERS}/${playlist.userId._id}`}>
                <p className="fnt-light mb-0 ms-1">
                  {playlist.userId.firstName}
                </p>
              </Link>
            </h3>
          )}
          <h3 className="fnt-light fnt-caption d-flex align-items-center">
            <HeartIcon isNegative isFull />
            <p className="ms-2 mb-0">{followersCounter} followers</p>
          </h3>
          {playlist.description !== "" && (
            <p className="fnt-light fnt-smallest mt-4">
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
                    data-bs-toggle="modal"
                    data-bs-target="#deletePlaylistModal"
                    type="button"
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
          <TrackList
            tracks={tracks}
            setTracks={setTracks}
            hasSorter
            isOnPlaylist={playlist}
          />
        </div>
        <DeleteModal
          id="deletePlaylistModal"
          modalTitle="Removing playlist"
          modalBody={`Are you sure you want to delete ${playlist.name}?`}
          handleSubmit={handleDeletePlaylist}
        />
      </div>
    </Layout>
  );
}
