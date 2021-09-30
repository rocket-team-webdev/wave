import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { PUBLIC } from "../../constants/routes";
import { likeTrack } from "../../api/track-api";
import { addSong, setQueue } from "../../redux/music-queue/actions";

import { deleteTrack } from "../../api/tracks-api";

import "./SongCard.scss";

export default function SongCard({
  songNumber,
  songImg,
  songName,
  artist,
  albumName,
  albumId,
  time,
  userId,
  playCounter = 0,
  songUrl,
  genreId,
  isLiked,
  songId,
}) {
  const [liked, setLiked] = useState(isLiked);
  const [isOwned, setIsOwned] = useState(false);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const songObject = {
    name: songName,
    url: songUrl,
    duration: time,
    genreId: genreId,
    userId: userId,
    artist: artist,
    album: albumName,
    isLiked: isLiked,
    songId: songId,
  };

  const handleIsOwned = () => {
    if (userId === userState.mongoId) {
      setIsOwned(true);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    try {
      likeTrack(songId);
    } catch (error) {
      toast(error.message, { type: "error" });
      setLiked(!liked);
    }
  };

  const handlePlay = () => {
    dispatch(setQueue(songObject));
  };

  const handleAddToQueue = () => {
    dispatch(addSong(songObject));
  };

  const handleDeleteSong = async () => {
    await deleteTrack(songId);
  };

  const timeIntoString = (seconds) => {
    const data = parseInt(seconds, 10);
    let minute = Math.floor((data / 60) % 60);
    minute = minute < 10 ? `0${minute}` : minute;
    let second = data % 60;
    second = second < 10 ? `0${second}` : second;
    return `${minute}:${second}`;
  };

  const formatPlayCounter = (counter) => {
    const result = counter
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    return result;
  };

  useEffect(() => {
    handleIsOwned();
  }, []);

  return (
    <div className="row card-hover fx-rounded" onDoubleClick={handlePlay}>
      <div className="col col-12 d-flex justify-content-between align-items-center py-2">
        <h3 className="m-0 px-2 fnt-song-bold text-start">{songNumber}</h3>
        <div className="play-hover" onClick={handlePlay} aria-hidden="true">
          <img className="fx-rounded mx-2" src={songImg} alt={songName} />
          <i className="fas fa-play fnt-white" />
        </div>
        <div className="d-flex fnt-primary px-2">
          <button className="text-center" type="button" onClick={handleLike}>
            {liked ? (
              <i className="fas fa-heart fnt-secondary" />
            ) : (
              <i className="far fa-heart fnt-secondary" />
            )}
          </button>
        </div>
        <div className=" px-2 col">
          <h3 className="m-0 text-start fnt-song-bold">{songName}</h3>
          <h4 className="m-0  text-start fnt-artist">{artist}</h4>
        </div>
        <Link
          className="m-0 text-start fnt-song-regular px-2 col"
          to={`${PUBLIC.ALBUMS}/${albumId}`}
        >
          {albumName}
        </Link>
        <h4 className="m-0 text-start fnt-song-regular px-2 col">
          {formatPlayCounter(playCounter)}
        </h4>
        <h4 className="m-0 text-start fnt-song-regular px-2 col">
          {timeIntoString(time)}
        </h4>
        <div className="dropdown">
          <button
            className="m-0 text-end"
            type="button"
            id="contextSongMenu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-ellipsis-h" />
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end clr-secondary p-1"
            aria-labelledby="contextSongMenu"
          >
            <button
              className="dropdown-item fnt-light fnt-song-regular "
              type="button"
              onClick={handleAddToQueue}
            >
              Add to queue
            </button>
            <hr className="dropdown-wrapper m-0" />
            {isOwned ? (
              <>
                <Link to={`${PUBLIC.TRACK_EDIT}/${songId}`}>
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
                  onClick={handleDeleteSong}
                >
                  Delete
                </button>
              </>
            ) : (
              <Link to={`${PUBLIC.USERS}/${userId}`}>
                <p
                  className="dropdown-item fnt-light fnt-song-regular m-0"
                  type="button"
                >
                  Go to user
                </p>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
