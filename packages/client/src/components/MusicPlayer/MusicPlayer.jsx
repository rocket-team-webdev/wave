import React, { useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useSelector } from "react-redux";

import "react-h5-audio-player/lib/styles.css";

import { FaPlay, FaPause, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdRepeat } from "react-icons/io";
import { ImShuffle } from "react-icons/im";

import "./MusicPlayer.scss";

export default function MusicPlayer() {
  // const isShuffle = true;
  // const isLiked = true;

  const queueState = useSelector((state) => state.queue);
  const [currentSong, setCurrentSong] = useState(0);
  const songObject = queueState.queue[currentSong];
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLiked, setIsLiked] = useState(true);

  const randomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };

  const nextSong = () => {
    if (isShuffle) {
      setCurrentSong(randomNumber(queueState.queue.length - 1));
      return;
    }
    if (queueState.queue.length > currentSong + 1)
      setCurrentSong(currentSong + 1);
    // TODO: else disable next button
  };
  const previousSong = () => {
    if (currentSong > 0) setCurrentSong(currentSong - 1);
    // TODO: else prev next button
  };

  const shuffle = (inputArray) => {
    const resultArray = [];
    for (let i = inputArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultArray[i], resultArray[j]] = [inputArray[j], inputArray[i]];
    }
    return resultArray;
  };

  const shuffleToggle = () => {
    setIsShuffle(!isShuffle);
    // if (isShuffle) dispatch(setQueue(shuffle(queueState.queue)));
    console.log("original", queueState.queue);
    console.log("shuffled", shuffle(queueState.queue));
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
        // autoPlay
        showSkipControls
        showJumpControls={false}
        src={songObject.url}
        onClickNext={nextSong}
        onClickPrevious={previousSong}
        onEnded={nextSong}
        layout="horizontal-reverse"
        customIcons={{
          play: <FaPlay />,
          pause: <FaPause />,
          loop: <IoMdRepeat />,
          loopOff: <IoMdRepeat style={{ color: "#B8BDAE" }} />,
        }}
        customControlsSection={[
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
        // onPlay={(e) => console.log("onPlay")}
        // other props here
        // header={`${songObject.name} - ${songObject.artist}`}
        // showSkipControls
        // showJumpControls={false}
        // onClickNext={nextSong}
        // onClickPrevious={previousSong}
        // onPlay={(e) => {
        //   console.log("e", e);
        // }}
        // onEnded={nextSong}
        // customAdditionalControls={[
        //   <button key={songObject.url} onClick={shuffleToggle} type="button">
        //     SHUFFLE {isShuffle && "🆗"}
        //   </button>,
        // ]}
        // onPlayError={ TODO pop up saying there was an error}
        // onChangeCurrentTimeError={TODO pop up saying there was an error}
      />
    </div>
  );
}
