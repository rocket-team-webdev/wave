import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link /* useRouteMatch,  */ } from "react-router-dom";
import { toast } from "react-toastify";
import { Draggable } from "react-beautiful-dnd";
import { FaEllipsisH } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  addSong,
  setPlayState,
  setSong,
  like,
} from "../../redux/music-queue/actions";
import { deleteTrack, likeTrack } from "../../api/tracks-api";
import { PUBLIC } from "../../constants/routes";
import { fromBottom } from "../../utils/motionSettings";

import HeartIcon from "../SVGicons/HeartIcon";

import "./TrackCard.scss";

export default function TrackCard({
  trackNumber,
  trackImg,
  trackName,
  artist,
  albumName,
  albumId,
  time,
  userId,
  playCounter = 0,
  trackUrl,
  genreId,
  isLiked,
  index,
  draggable = false,
  trackId,
  updateLikedView = () => {},
  updateDeletedView = () => {},
  isOnPlaylist,
}) {
  const [liked, setLiked] = useState(isLiked);
  const [isOwned, setIsOwned] = useState(false);
  const [onOwnedPlaylist, setOnOwnedPlaylist] = useState(false);
  const userState = useSelector((state) => state.user);
  const queueState = useSelector((state) => state.queue);
  const dispatch = useDispatch();
  const trackObject = {
    name: trackName,
    url: trackUrl,
    duration: time,
    genreId: genreId,
    userId: userId,
    artist: artist,
    album: albumName,
    isLiked: isLiked,
    trackId: trackId,
    albumId: albumId,
    trackImg: trackImg,
  };

  const handleOnOwnedPlaylist = () => {
    if (isOnPlaylist && isOnPlaylist.userId === userState.mongoId)
      setOnOwnedPlaylist(true);
  };

  const handleIsOwned = () => {
    if (userId === userState.mongoId) {
      setIsOwned(true);
    }
  };

  const handleLike = async () => {
    const userLike = !liked;
    setLiked(userLike);

    try {
      await likeTrack(trackId);
      updateLikedView(
        {
          ...trackObject,
          album: { title: albumName, thumbnail: trackImg },
          isLiked: userLike,
          _id: trackId,
        },
        userLike,
      );

      queueState.queue.map((song, i) => {
        if (song.trackId === trackId) dispatch(like(i));
        return song;
      });
    } catch (error) {
      toast(error.message, { type: "error" });
      setLiked(!liked);
    }
  };

  const handlePlay = () => {
    dispatch(setSong(trackObject));
    dispatch(setPlayState(true));
  };

  const handleAddToQueue = () => {
    dispatch(addSong(trackObject));
  };

  const handleDeleteSong = async () => {
    await deleteTrack(trackId);
    updateDeletedView(trackId);
  };

  const handleRemoveFromPlaylist = async () => {
    // await deleteFromPlaylist(trackId);
    updateDeletedView(trackId);
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

  const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && "rgba(250, 250, 250, 0.2)",
    backdropFilter: isDragging && "blur(10px)",
    boxShadow: isDragging && "0 .5rem 1rem rgba(0,0,0,.15)",

    // styles needed to apply on draggables
    ...draggableStyle,
  });

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  useEffect(() => {
    handleIsOwned();
    handleOnOwnedPlaylist();
  }, []);

  return (
    <motion.div
      // Animation settings
      variants={fromBottom}
      // whileTap={pressedElement}
    >
      <Draggable
        draggableId={trackId}
        index={index}
        isDragDisabled={!draggable}
      >
        {(provided, snapshot) => (
          <div
            className="row m-0 col col-12 card-hover fx-rounded clr-primary"
            onDoubleClick={handlePlay}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
            )}
          >
            <div className="col col-12 d-flex justify-content-between align-items-center py-2">
              {/* Number */}
              <div className="col col-2 d-flex justify-content-between align-items-center">
                <h3 className="m-0 px-2 fnt-song-bold text-start song-index">
                  {trackNumber}
                </h3>
                {/* Thumbnail */}
                <div
                  className="d-none d-lg-inline play-hover"
                  onClick={handlePlay}
                  aria-hidden="true"
                >
                  <img className="fx-rounded" src={trackImg} alt={trackName} />
                  <i className="fas fa-play fnt-white" />
                </div>
                {/* Like */}
                <div className="d-flex fnt-primary px-2">
                  <button
                    className="text-center"
                    type="button"
                    onClick={handleLike}
                  >
                    {liked ? <HeartIcon isFull /> : <HeartIcon />}
                  </button>
                </div>
              </div>
              <div className="col col-3 d-flex justify-content-between align-items-center">
                {/* Title/Artist */}
                <div className=" px-2 col title-and-artist">
                  <h3 className="m-0 text-start fnt-song-bold truncate">
                    {trackName}
                  </h3>
                  <h4 className="m-0 text-start fnt-artist truncate">
                    {artist}
                  </h4>
                </div>
              </div>
              <div className="col col-3 d-flex justify-content-between align-items-center">
                {/* Album */}
                <Link
                  className="m-0 text-start fnt-song-regular px-2 col truncate track-album"
                  to={`${PUBLIC.ALBUMS}/${albumId}`}
                >
                  {albumName}
                </Link>
              </div>
              {/* Playcounter */}
              <div className="col col-2 d-flex justify-content-between align-items-center">
                <h4 className="m-0 text-start fnt-song-regular px-2 track-playcounter ">
                  {formatPlayCounter(playCounter)}
                </h4>
              </div>
              <div className="col col-2 d-flex justify-content-between align-items-center">
                {/* Time */}
                <h4 className="m-0 text-start fnt-song-regular px-2 track-time">
                  {timeIntoString(time)}
                </h4>
                {/* Contextual menu */}
                <div className="dropdown">
                  <button
                    className="m-0 text-end"
                    type="button"
                    id="contextSongMenu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaEllipsisH />
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
                    {onOwnedPlaylist ? (
                      <button
                        className="dropdown-item fnt-danger fnt-song-regular clr-danger"
                        type="button"
                        onClick={handleRemoveFromPlaylist}
                      >
                        Remove from Playlist
                      </button>
                    ) : null}
                    {isOwned ? (
                      <>
                        <Link to={`${PUBLIC.TRACK_EDIT}/${trackId}`}>
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
          </div>
        )}
      </Draggable>
    </motion.div>
  );
}
