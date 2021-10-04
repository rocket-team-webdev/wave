import React, { useState, useEffect, useRef } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { FaPlay, FaPause } from "react-icons/fa";
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
  like,
} from "../../redux/music-queue/actions";
import { likeTrack } from "../../api/tracks-api";

import HeartIcon from "../SVGicons/HeartIcon";

export default function MusicPlayer() {
  const queueState = useSelector((state) => state.queue);
  const dispatch = useDispatch();
  const [listPosition, setListPosition] = useState(0);
  const trackObject = queueState.isShuffled
    ? queueState.queue[queueState.shuffleOrder[listPosition]]
    : queueState.queue[listPosition];
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatState, setRepeatState] = useState("false");
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const audioPlayer = useRef(null);

  const nextTrack = () => {
    if (queueState.queue.length > listPosition + 1) {
      setListPosition(listPosition + 1);
    } else if (repeatState === "queue") setListPosition(0);

    if (listPosition >= queueState.queue.length - 2 && repeatState !== "queue")
      setNextButtonDisabled(true);
    else setNextButtonDisabled(false);
    if (listPosition <= 1) setPrevButtonDisabled(false);
  };
  const previousTrack = () => {
    if (listPosition > 0) {
      setListPosition(listPosition - 1);
      setNextButtonDisabled(false);
    }
    if (listPosition <= 1) setPrevButtonDisabled(true);
    else setPrevButtonDisabled(false);
    if (listPosition >= queueState.queue.length - 2)
      setNextButtonDisabled(false);
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

  const repeatToggle = () => {
    const toggleStates = ["false", "track", "queue"];
    const statePosition = toggleStates.findIndex(
      (element) => element === repeatState,
    );
    if (statePosition === 0) audioPlayer.current.audio.current.loop = true;
    else audioPlayer.current.audio.current.loop = false;
    if (statePosition === 1) setNextButtonDisabled(false);
    setRepeatState(
      toggleStates[
        statePosition === toggleStates.length - 1 ? 0 : statePosition + 1
      ],
    );
  };

  const handleLike = async () => {
    if (isShuffle) dispatch(like(queueState.shuffleOrder[listPosition]));
    else dispatch(like(listPosition));
    try {
      await likeTrack(trackObject.trackId);
      // updateLikedView(
      //   {
      //     ...trackObject,
      //     album: { title: albumName, thumbnail: trackImg },
      //     isLiked: userLike,
      //     _id: trackId,
      //   },
      //   userLike,
      // );
    } catch (error) {
      dispatch(like(listPosition));
      toast(error.message, { type: "error" });
    }
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

  return (
    <>
      {queueState.queue.length > 0 && (
        <div className="rhap_main-container clr-white">
          <div className="rhap_track-info">
            <div className="rhap_album-thumb">
              <Link to={`${PUBLIC.ALBUMS}/${trackObject.albumId}`}>
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
              <p className="rhap_track-tittle mb-0 fnt-song-bold lh-1 pe-4">
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
              >
                <i className="fas fa-ellipsis-h" />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end clr-secondary p-1"
                aria-labelledby="contextTrackMenu"
              >
                <>
                  <Link to={`${PUBLIC.TRACK_EDIT}`}>
                    <p
                      className="dropdown-item fnt-light fnt-song-regular m-0"
                      type="button"
                    >
                      Queue/Playlist
                    </p>
                  </Link>
                  <hr className="dropdown-wrapper m-0" />
                  <button
                    className="dropdown-item fnt-light fnt-song-regular"
                    type="button"
                    onClick={() => {}}
                  >
                    Cast to device
                  </button>
                </>
              </ul>
            </div>
          </div>
          <AudioPlayer
            autoPlay
            volume={0}
            showSkipControls
            showJumpControls={false}
            src={trackObject.url}
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
              <div className="rhap_repeat-controls" key={trackObject.duration}>
                <button
                  onClick={repeatToggle}
                  type="button"
                  className={`${
                    repeatState === "false" ? "button-off" : "button-on"
                  } rhap_button-repeat`}
                >
                  {repeatState === "track" ? <MdRepeatOne /> : <MdRepeat />}
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
