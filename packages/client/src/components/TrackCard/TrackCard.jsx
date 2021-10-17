import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link /* useRouteMatch,  */ } from "react-router-dom";
import { toast } from "react-toastify";
import { Draggable } from "react-beautiful-dnd";
import { FaEllipsisH } from "react-icons/fa";
import { VscTriangleDown } from "react-icons/vsc";
import { motion } from "framer-motion";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import {
  addSong,
  deleteSong,
  setPlayState,
  setSong,
  like,
  clearQueue,
  setListPosition,
} from "../../redux/music-queue/actions";
import { deleteTrack, likeTrack } from "../../api/tracks-api";
import { getMyPlaylists } from "../../api/me-api";
import {
  addTrackToPlaylist,
  deleteTrackFromPlaylist,
} from "../../api/playlists-api";
import { PUBLIC } from "../../constants/routes";
import { fromBottom } from "../../utils/motionSettings";

import HeartIcon from "../SVGicons/HeartIcon";

import DeleteModal from "../DeleteModal";

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
  popularity = 0,
  trackUrl,
  genreId,
  isLiked,
  index,
  draggable = false,
  trackId,
  isPlaceholder = false,
  updateLikedView = () => {},
  updateDeletedView = () => {},
  isOnPlaylist = false,
  isOnQueue = false,
}) {
  const [liked, setLiked] = useState(isLiked);
  const [isOwned, setIsOwned] = useState(false);
  const [onOwnedPlaylist, setOnOwnedPlaylist] = useState(false);
  const userState = useSelector((state) => state.user);
  const queueState = useSelector((state) => state.queue);
  const [myPlaylists, setMyPlaylists] = useState([]);
  const dispatch = useDispatch();
  const contextualDropDownRef = useRef([]);
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
    popularity: popularity,
  };

  const handleCloseContextual = () => {
    const contextualDropDown = new bootstrap.Dropdown(
      contextualDropDownRef.current,
    );
    contextualDropDown.hide();
  };

  const handleOnOwnedPlaylist = () => {
    if (isOnPlaylist && isOnPlaylist.userId._id === userState.mongoId)
      setOnOwnedPlaylist(true);
  };

  const handleIsOwned = () => {
    if (userId === userState.mongoId) {
      setIsOwned(true);
    }
  };

  const handleLike = async () => {
    const userLike = !liked;

    try {
      await likeTrack(trackId);
      setLiked(userLike);
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
    if (isOnQueue) {
      dispatch(setListPosition(index));
      dispatch(setPlayState(true));
    } else {
      const songRepeat = queueState.queue.find(
        (item) => item.trackId === trackObject.trackId,
      );
      if (!songRepeat) {
        const payload = { track: trackObject, offset: 1 };
        if (queueState.listPosition === 0) payload.offset = 0;
        dispatch(setSong(payload));
        dispatch(setPlayState(true));
      } else {
        toast(`Song already exists on your queue`, { type: "error" });
      }
    }
  };

  const handleAddToQueue = () => {
    // const dropdownElementList = [].slice.call(
    //   document.querySelectorAll(".dropdown-toggle"),
    // );
    // const dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
    //   return new bootstrap.Dropdown(dropdownToggleEl);
    // });
    handleCloseContextual();
    const songRepeat = queueState.queue.find(
      (item) => item.trackId === trackObject.trackId,
    );
    if (!songRepeat) {
      dispatch(addSong(trackObject));
    } else {
      toast(`Song already exists on your queue`, { type: "error" });
    }
  };

  const handleDeleteFromQueue = () => {
    handleCloseContextual();
    if (queueState.queue.length === 1) {
      dispatch(clearQueue());
    } else {
      const payload = {
        index: index,
        listPosition: queueState.listPosition,
        offset: 0,
      };
      if (
        queueState.listPosition + 1 === queueState.queue.length ||
        (index === queueState.listPosition && index !== 0)
      ) {
        payload.offset = 1;
      }
      dispatch(deleteSong(payload));
    }
  };

  const handleDeleteSong = async () => {
    try {
      handleCloseContextual();
      await deleteTrack(trackId);
      handleDeleteFromQueue();
      updateDeletedView(trackId);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleRemoveFromPlaylist = async () => {
    handleCloseContextual();
    try {
      const playlistId = isOnPlaylist._id;
      await deleteTrackFromPlaylist(playlistId, trackId);
      updateDeletedView(trackId);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
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

  const handleOpenDropdown = async () => {
    const myPlaylistsData = await getMyPlaylists(0, 10, true);
    setMyPlaylists(myPlaylistsData.data.data);
  };

  const handleAddToPlaylist = async (event) => {
    handleCloseContextual();
    const playlistId = event.target.getAttribute("playlistid");
    try {
      await addTrackToPlaylist(playlistId, trackId);
      toast(`Song successfully added to playlist`, { type: "success" });
    } catch (error) {
      if (error.response.status === 400) {
        toast("This song is already part of this playlist", {
          type: "warning",
        });
      } else {
        toast(error.message, { type: "error" });
      }
    }
  };

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  useEffect(() => {
    handleIsOwned();
    handleOnOwnedPlaylist();
  }, []);

  return (
    <>
      {isPlaceholder ? (
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
                className="row m-0 col card-hover col-12 mb-1"
                // onDoubleClick={handlePlay}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style,
                )}
                data-testid="trackCard"
              >
                <div className="col col-12 d-flex justify-content-center fx-rounded card-placeholder card-inside align-items-center py-2">
                  <h3 className="m-0 ps-2 fnt-song-bold text-start song-index fnt-light">
                    New song
                  </h3>
                </div>
              </div>
            )}
          </Draggable>

          <DeleteModal
            // id="deleteTrackModal"
            id={`deleteTrackModal${trackId}`}
            modalTitle="Removing track"
            modalBody={`Are you sure you want to delete ${trackName}?`}
            handleSubmit={handleDeleteSong}
          />
          <DeleteModal
            // id="deleteFromPlaylistModal"
            id={`deleteFromPlaylistModal${trackId}`}
            modalTitle="Removing track from playlist"
            modalBody={`Are you sure you want to delete ${trackName} from the current playlist?`}
            handleSubmit={handleRemoveFromPlaylist}
          />
        </motion.div>
      ) : (
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
                className="row m-0 col col-12 card-hover fx-rounded fnt-light mb-1"
                onDoubleClick={handlePlay}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style,
                )}
                data-testid="trackCard"
              >
                <div className="col col-12 d-flex justify-content-between card-inside align-items-center py-2">
                  <div className="col col-2 d-flex align-items-center">
                    {/* Number */}
                    <h3 className="m-0 ps-2 fnt-song-bold text-start song-index fnt-light">
                      {trackNumber}
                    </h3>
                    {/* Thumbnail */}
                    <div
                      className="d-none d-xl-inline play-hover p-1 d-flex align-items-center"
                      onClick={handlePlay}
                      aria-hidden="true"
                    >
                      <img
                        className="fx-rounded"
                        src={trackImg}
                        alt={trackName}
                      />
                      <i className="fas fa-play fnt-white" />
                      {/* <FaPlay className="play-icon fnt-white" /> */}
                    </div>
                    {/* Like */}
                    <div className="d-flex fnt-primary">
                      <button
                        className="text-center fnt-light"
                        type="button"
                        onClick={handleLike}
                      >
                        {liked ? (
                          <HeartIcon isFull isNegative />
                        ) : (
                          <HeartIcon isNegative />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="col col-3 d-flex justify-content-between align-items-center">
                    {/* Title/Artist */}
                    <div className=" ps-md-3 pe-md-2 px-2 col title-and-artist">
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
                      className="m-0 text-start fnt-song-regular fnt-light px-2 col truncate track-album"
                      to={`${PUBLIC.ALBUM}/${albumId}`}
                    >
                      {albumName}
                    </Link>
                  </div>
                  {/* Playcounter */}
                  <div className="col col-2 d-flex justify-content-between align-items-center">
                    <h4 className="m-0 text-start fnt-song-regular px-2 track-playcounter ">
                      {formatPlayCounter(popularity)}
                    </h4>
                  </div>
                  <div className="col col-2 d-flex justify-content-between align-items-center">
                    {/* Time */}
                    <h4 className="m-0 text-start fnt-song-regular px-2 track-time truncate">
                      {timeIntoString(time)}
                    </h4>
                    {/* Contextual menu */}
                    <div className="dropdown">
                      <button
                        className="m-0 text-end fnt-light"
                        type="button"
                        id="contextSongMenu"
                        data-bs-toggle="dropdown"
                        // aria-expanded="false"
                        onClick={handleOpenDropdown}
                        data-bs-auto-close="outside"
                        ref={contextualDropDownRef}
                      >
                        <FaEllipsisH />
                      </button>
                      <ul
                        className="dropdown-menu dropdown-menu-end clr-secondary p-1"
                        aria-labelledby="contextSongMenu"
                      >
                        {isOnQueue ? (
                          <li>
                            <button
                              className="dropdown-item fnt-light fnt-song-regular "
                              type="button"
                              onClick={handleDeleteFromQueue}
                            >
                              Delete from queue
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button
                              className="dropdown-item fnt-light fnt-song-regular "
                              type="button"
                              // data-bs-toggle="dropdown"
                              onClick={handleAddToQueue}
                            >
                              Add to queue
                            </button>
                          </li>
                        )}
                        <li className="dropstart">
                          <a
                            className="dropdown-item fnt-light fnt-song-regular"
                            // type="button"
                            data-bs-toggle="dropdown"
                            id="contextAddToPlaylist"
                            href="#addToPlaylist"
                            data-bs-offset="-60,5"
                          >
                            <span className="fnt-light fnt-song-regular">
                              Add to playlist <VscTriangleDown />
                            </span>
                          </a>
                          <ul
                            className="dropdown-menu dropdown-menu-start clr-secondary p-1"
                            aria-labelledby="addToPlaylist"
                          >
                            {myPlaylists.length > 0 &&
                              myPlaylists.map((playlistElement) => (
                                <li key={playlistElement._id}>
                                  <button
                                    className="dropdown-item fnt-light fnt-song-regular"
                                    type="button"
                                    onClick={handleAddToPlaylist}
                                    playlistid={playlistElement._id}
                                  >
                                    {playlistElement.name}
                                  </button>
                                </li>
                              ))}
                            <li>
                              <hr className="dropdown-wrapper m-0" />

                              <Link
                                to={{
                                  pathname: `${PUBLIC.ADD_PLAYLIST}`,
                                  state: {
                                    trackId: trackId,
                                  },
                                }}
                              >
                                <p
                                  className="dropdown-item fnt-light fnt-song-regular m-0"
                                  type="button"
                                >
                                  New Playlist
                                </p>
                              </Link>
                            </li>
                          </ul>
                        </li>

                        {isOwned ? (
                          <>
                            <hr className="dropdown-wrapper m-0" />
                            <li>
                              <Link to={`${PUBLIC.TRACK_EDIT}/${trackId}`}>
                                <p
                                  className="dropdown-item fnt-light fnt-song-regular m-0"
                                  type="button"
                                >
                                  Edit song
                                </p>
                              </Link>
                            </li>
                            <li>
                              <button
                                className="dropdown-item fnt-light fnt-song-regular"
                                data-bs-toggle="modal"
                                data-bs-target={`#deleteTrackModal${trackId}`}
                                type="button"
                              >
                                Delete song
                              </button>
                            </li>
                            <hr className="dropdown-wrapper m-0" />
                          </>
                        ) : (
                          <>
                            <hr className="dropdown-wrapper m-0" />
                            <li>
                              <Link to={`${PUBLIC.USERS}/${userId}`}>
                                <p
                                  className="dropdown-item fnt-light fnt-song-regular m-0"
                                  type="button"
                                >
                                  Go to user
                                </p>
                              </Link>
                            </li>
                          </>
                        )}
                        {!isOwned && onOwnedPlaylist ? (
                          <hr className="dropdown-wrapper m-0" />
                        ) : null}
                        {onOwnedPlaylist ? (
                          <button
                            className="dropdown-item fnt-song-regular fnt-light"
                            data-bs-toggle="modal"
                            data-bs-target={`#deleteFromPlaylistModal${trackId}`}
                            type="button"
                          >
                            Remove from Playlist
                          </button>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Draggable>

          <DeleteModal
            // id="deleteTrackModal"
            id={`deleteTrackModal${trackId}`}
            modalTitle="Removing track"
            modalBody={`Are you sure you want to delete ${trackName}?`}
            handleSubmit={handleDeleteSong}
          />
          <DeleteModal
            // id="deleteFromPlaylistModal"
            id={`deleteFromPlaylistModal${trackId}`}
            modalTitle="Removing track from playlist"
            modalBody={`Are you sure you want to delete ${trackName} from the current playlist?`}
            handleSubmit={handleRemoveFromPlaylist}
          />
        </motion.div>
      )}
    </>
  );
}
