import React, { useState, useRef } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useSelector, useDispatch } from "react-redux";

import { FaPlay, FaPause, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdRepeat } from "react-icons/io";
import { ImShuffle } from "react-icons/im";

import "react-h5-audio-player/lib/styles.css";
import "./MusicPlayer.scss";

import { clearShuffle, setShuffle } from "../../redux/music-queue/actions";

export default function MusicPlayer() {
  const queueState = useSelector((state) => state.queue);
  const dispatch = useDispatch();
  const [listPosition, setListPosition] = useState(0);
  const songObject = queueState.isShuffled
    ? queueState.queue[queueState.shuffleOrder[listPosition]]
    : queueState.queue[listPosition];
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [repeatState, setRepeatState] = useState("false");
  const audioPlayer = useRef(null);

  const nextSong = () => {
    // if (repeatState !== "song") {
    if (queueState.queue.length > listPosition + 1)
      setListPosition(listPosition + 1);
    else if (repeatState === "queue") setListPosition(0);
    // TODO: else disable next button
    // } else setListPosition(listPosition);
    // }
  };
  const previousSong = () => {
    if (listPosition > 0) setListPosition(listPosition - 1);
    // TODO: else disable prev button
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
    const toggleStates = ["false", "song", "queue"];
    const statePosition = toggleStates.findIndex(
      (element) => element === repeatState,
    );
    if (statePosition === 0) audioPlayer.current.audio.current.loop = true;
    else audioPlayer.current.audio.current.loop = false;
    setRepeatState(
      toggleStates[
        statePosition === toggleStates.length - 1 ? 0 : statePosition + 1
      ],
    );
  };

  const likeSong = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="rhap_main-container clr-white">
      <div className="rhap_song-info">
        <div className="rhap_album-thumb">
          <img
            src="https://loudcave.es/wp-content/uploads/2021/04/cbf7b52dab62a3eb745e6730068abc4a.1000x1000x1.jpg"
            alt="album-cover"
            className="rhap_thumb-album-img"
          />
        </div>
        <button type="button" className="rhap_like-button" onClick={likeSong}>
          {" "}
          {isLiked ? (
            <FaHeart className="rhap_like-icon" />
          ) : (
            <FaRegHeart className="rhap_like-icon" />
          )}
        </button>
        <div className="rhap_song-text">
          <p className="rhap_song-tittle mb-0 fnt-song-bold lh-1 pe-4">
            {songObject.name}
          </p>
          <p className="rhap_song-artist mb-0 fnt-song-light lh-1">
            {songObject.artist}
          </p>
        </div>
      </div>
      <AudioPlayer
        showSkipControls
        showJumpControls={false}
        src={songObject.url}
        onClickNext={nextSong}
        onClickPrevious={previousSong}
        onEnded={nextSong}
        customAdditionalControls={[]}
        ref={audioPlayer}
        layout="horizontal-reverse"
        customIcons={{
          play: <FaPlay />,
          pause: <FaPause />,
          loop: <IoMdRepeat />,
          loopOff: <IoMdRepeat style={{ color: "#B8BDAE" }} />,
        }}
        customControlsSection={[
          <div className="rhap_shuffle-controls" key={songObject.duration}>
            <button
              onClick={repeatToggle}
              type="button"
              // className={`${
              //   isShuffle ? "shuffle-on" : "shuffle-off"
              // } rhap_button-shuffle `}
            >
              <ImShuffle />
            </button>
          </div>,
          RHAP_UI.ADDITIONAL_CONTROLS,
          RHAP_UI.MAIN_CONTROLS,
          <div className="rhap_shuffle-controls" key={songObject.url}>
            <button
              onClick={shuffleToggle}
              type="button"
              className={`${
                isShuffle ? "shuffle-on" : "shuffle-off"
              } rhap_button-shuffle `}
            >
              <ImShuffle />
            </button>
          </div>,
          RHAP_UI.VOLUME_CONTROLS,
        ]}
        // onPlayError={ TODO pop up saying there was an error}
        // onChangeCurrentTimeError={TODO pop up saying there was an error}
      />
    </div>
  );
}
