import React, { useState, useEffect, useRef } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEllipsisH, FaPlay, FaPause } from "react-icons/fa";
import {
  MdRepeat,
  MdRepeatOne,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { IoMdRepeat } from "react-icons/io";
import { ImShuffle } from "react-icons/im";
import { PUBLIC } from "../../constants/routes";

import "react-h5-audio-player/lib/styles.css";
import "./MusicPlayer.scss";

import {
  clearShuffle,
  setShuffle,
  setRepeat,
  like,
  nextSong,
  prevSong,
  setListPosition,
  setPlayState,
  clearQueue,
} from "../../redux/music-queue/actions";
import { likeTrack } from "../../api/tracks-api";
import { getMyPlaylists } from "../../api/me-api";
import { addTrackToPlaylist } from "../../api/playlists-api";

import HeartIcon from "../SVGicons/HeartIcon";
import { saveListened } from "../../api/playback-api";

export default function MusicPlayer() {
  const queueState = useSelector((state) => state.queue);
  const userState = useSelector((state) => state.user);
  const listPosition = queueState.listPosition;
  const trackObject = queueState.isShuffled
    ? queueState.queue[queueState.shuffleOrder[listPosition]]
    : queueState.queue[listPosition];
  // const [trackObject, setTrackObject] = useState(
  //   queueState.isShuffled
  //     ? queueState.queue[queueState.shuffleOrder[listPosition]]
  //     : queueState.queue[listPosition],
  // );
  const [isShuffle, setIsShuffle] = useState(queueState.isShuffled);
  // const [repeatState, setRepeatState] = useState(queueState.repeatState);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const audioPlayer = useRef(null);
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [hasPlayed, setHasPlayed] = useState([false]);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   return function cleanUp() {
  //     console.log("unmounted");
  //     setTrackObject(null);
  //   };
  // });

  const handlePlay = () => {
    dispatch(setPlayState(false));
    if (!hasPlayed) {
      saveListened(trackObject.trackId, userState.mongoId);
      setHasPlayed(true);
    }
  };

  const nextTrack = () => {
    if (queueState.queue.length > 1) {
      if (queueState.queue.length > listPosition + 1) {
        dispatch(nextSong());
      } else if (queueState.repeatState === "queue") {
        dispatch(setListPosition(0));
        dispatch(setPlayState(true));
      }
      if (
        listPosition >= queueState.queue.length - 2 &&
        queueState.repeatState !== "queue"
      )
        setNextButtonDisabled(true);
      else setNextButtonDisabled(false);
      if (listPosition <= 1) setPrevButtonDisabled(false);
    }
  };

  const previousTrack = () => {
    if (queueState.queue.length > 1) {
      if (listPosition > 0) {
        dispatch(prevSong());
        setNextButtonDisabled(false);
      }
      if (listPosition <= 1) setPrevButtonDisabled(true);
      else setPrevButtonDisabled(false);
      if (listPosition >= queueState.queue.length - 2)
        setNextButtonDisabled(false);
    }
  };

  const shuffledArray = (arrayLength, min) => {
    // Durstenfeld shuffle with minimum
    const resultArray = Array.from(Array(arrayLength).keys());
    for (let i = resultArray.length - 1; i > min; i -= 1) {
      const j = Math.floor(Math.random() * (i - (min + 1)) + min + 1);
      [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
    }
    return resultArray;
  };

  const shuffleToggle = () => {
    if (!isShuffle)
      dispatch(
        setShuffle(shuffledArray(queueState.queue.length, listPosition)),
      );
    else dispatch(clearShuffle());
    setIsShuffle(!isShuffle);
  };

  const setRepeatToggle = () => {
    if (queueState.repeatState === "track")
      audioPlayer.current.audio.current.loop = true;
    else audioPlayer.current.audio.current.loop = false;
  };

  const repeatToggle = () => {
    const toggleStates = ["false", "track", "queue"];
    const statePosition = toggleStates.findIndex(
      (element) => element === queueState.repeatState,
    );
    console.log(statePosition);
    if (statePosition === 0) audioPlayer.current.audio.current.loop = true;
    else audioPlayer.current.audio.current.loop = false;
    if (statePosition === 1) setNextButtonDisabled(false);
    dispatch(
      setRepeat(
        toggleStates[
          statePosition === toggleStates.length - 1 ? 0 : statePosition + 1
        ],
      ),
    );
    // setRepeatState(
    //   toggleStates[
    //     statePosition === toggleStates.length - 1 ? 0 : statePosition + 1
    //   ],
    // );
  };

  const handleLike = async () => {
    if (isShuffle) dispatch(like(queueState.shuffleOrder[listPosition]));
    else dispatch(like(listPosition));
    try {
      await likeTrack(trackObject.trackId);
    } catch (error) {
      dispatch(like(listPosition));
      toast(error.message, { type: "error" });
    }
  };

  const handleOpenDropdown = async () => {
    const myPlaylistsData = await getMyPlaylists(0, 10, true);
    setMyPlaylists(myPlaylistsData.data.data);
  };

  const handleAddToPlaylist = async (event) => {
    const playlistId = event.target.getAttribute("playlistid");
    try {
      await addTrackToPlaylist(playlistId, trackObject._id);
      toast(`Song successfully added to playlist`, { type: "success" });
    } catch (error) {
      if (error.message === "Request failed with status code 400") {
        toast("This song is already part of this playlist", {
          type: "warning",
        });
      } else {
        toast(error.message, { type: "error" });
      }
    }
  };

  const handleClearQueue = () => {
    dispatch(clearQueue());
  };

  const handleError = (error) => {
    toast(error, { type: "error" });
  };

  useEffect(() => {
    if (queueState.queue.length > 1) {
      if (listPosition === 0) {
        setPrevButtonDisabled(true);
        setNextButtonDisabled(false);
      } else if (listPosition === queueState.queue.length - 1) {
        setPrevButtonDisabled(false);
        setNextButtonDisabled(true);
      } else {
        setPrevButtonDisabled(false);
        setNextButtonDisabled(false);
      }
    } else {
      setPrevButtonDisabled(true);
      setNextButtonDisabled(true);
    }
  }, [queueState]);

  useEffect(() => {
    if (queueState.willPlay) {
      audioPlayer.current.audio.current.play();
    }
    setRepeatToggle();
  }, []);

  useEffect(() => {
    if (queueState.willPlay) {
      audioPlayer.current.audio.current.play();
    }
  }, [queueState.willPlay]);

  useEffect(() => {
    if (queueState.willPlay) {
      setHasPlayed(false);
    }
  }, [trackObject?.url]);

  return (
    <>
      {queueState.queue.length > 0 &&
        userState.isLogged &&
        trackObject !== null && (
          <div className="rhap_main-container clr-white">
            <div className="rhap_track-info">
              <div className="rhap_album-thumb">
                <Link to={`${PUBLIC.ALBUM}/${trackObject.albumId}`}>
                  <img
                    src={trackObject.trackImg}
                    alt="album-cover"
                    className="rhap_thumb-album-img"
                  />
                </Link>
              </div>
              <button
                type="button"
                className="rhap_like-button"
                onClick={handleLike}
              >
                {trackObject.isLiked ? (
                  <HeartIcon classNames="rhap_like-icon" isFull />
                ) : (
                  <HeartIcon classNames="rhap_like-icon" />
                )}
              </button>
              <div className="rhap_track-text">
                <p className="rhap_track-title fnt-song-bold lh-1">
                  {trackObject.name}
                </p>
                <p className="rhap_track-artist mb-0 fnt-song-light lh-1">
                  {trackObject.artist}
                </p>
              </div>
              <div className="dropdown">
                <button
                  className="m-0 text-end"
                  type="button"
                  id="contextTrackMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={handleOpenDropdown}
                >
                  <FaEllipsisH />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end clr-secondary p-1"
                  aria-labelledby="contextTrackMenu"
                >
                  <>
                    <Link to={`${PUBLIC.QUEUE}`}>
                      <p
                        className="dropdown-item fnt-light fnt-song-regular m-0"
                        type="button"
                      >
                        Queue
                      </p>
                    </Link>
                    <hr className="dropdown-wrapper m-0" />
                    <li className="">
                      <a
                        className="dropdown-item fnt-light fnt-song-regular"
                        // data-toggle="dropdown"
                        href="#clearQueue"
                        onClick={handleClearQueue}
                      >
                        <span className="fnt-light fnt-song-regular">
                          Clear queue
                        </span>
                      </a>
                    </li>
                    <hr className="dropdown-wrapper m-0" />
                    <li className="">
                      <a
                        className="dropdown-item fnt-light fnt-song-regular dropdown-toggle"
                        // type="button"
                        data-toggle="dropdown"
                        href="#addToPlaylist"
                      >
                        <span className="fnt-light fnt-song-regular">
                          Add to playlist
                        </span>
                      </a>
                      <ul
                        className="dropdown-menu dropdown-submenu dropdown-submenu-left-top clr-secondary p-1"
                        id="addToPlaylist"
                      >
                        {myPlaylists.length > 0 &&
                          myPlaylists.map((playlistElement, playlistIndex) => (
                            <li key={playlistElement._id}>
                              {playlistIndex > 0 && (
                                <hr className="dropdown-wrapper m-0" />
                              )}
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
                                trackId: trackObject._id,
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
                  </>
                </ul>
              </div>
            </div>
            <AudioPlayer
              autoPlayAfterSrcChange={false}
              volume={0.1}
              showSkipControls
              showJumpControls={false}
              src={trackObject.url}
              onPlay={handlePlay}
              onClickNext={nextTrack}
              onClickPrevious={previousTrack}
              onEnded={nextTrack}
              ref={audioPlayer}
              layout="horizontal-reverse"
              customIcons={{
                play: <FaPlay />,
                pause: <FaPause />,
                loop: <IoMdRepeat />,
                loopOff: <IoMdRepeat style={{ color: "#B8BDAE" }} />,
                previous: (
                  <MdSkipPrevious
                    className={`${
                      prevButtonDisabled ? "next-prev-off" : "next-prev-on"
                    }`}
                  />
                ),
                next: (
                  <MdSkipNext
                    className={`${
                      nextButtonDisabled ? "next-prev-off" : "next-prev-on"
                    }`}
                  />
                ),
              }}
              customControlsSection={[
                <div
                  className="rhap_repeat-controls"
                  key={trackObject.duration}
                >
                  <button
                    onClick={repeatToggle}
                    type="button"
                    className={`${
                      queueState.repeatState === "false"
                        ? "button-off"
                        : "button-on"
                    } rhap_button-repeat`}
                  >
                    {queueState.repeatState === "track" ? (
                      <MdRepeatOne />
                    ) : (
                      <MdRepeat />
                    )}
                  </button>
                </div>,
                RHAP_UI.MAIN_CONTROLS,
                <div className="rhap_shuffle-controls" key={trackObject.url}>
                  <button
                    onClick={shuffleToggle}
                    type="button"
                    className={`${
                      isShuffle ? "button-on" : "button-off"
                    } rhap_button-shuffle `}
                  >
                    <ImShuffle />
                  </button>
                </div>,
              ]}
              customProgressBarSection={[
                RHAP_UI.CURRENT_TIME,
                RHAP_UI.PROGRESS_BAR,
                RHAP_UI.DURATION,
                RHAP_UI.VOLUME,
              ]}
              onPlayError={handleError}
              onChangeCurrentTimeError={handleError}
            />
          </div>
        )}
    </>
  );
}
