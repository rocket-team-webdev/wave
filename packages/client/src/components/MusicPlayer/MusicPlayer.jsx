import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "react-h5-audio-player/lib/styles.css";
// import { setQueue } from "../../redux/music-queue/actions";

export default function MusicPlayer() {
  const queueState = useSelector((state) => state.queue);
  // const dispatch = useDispatch();
  const [currentSong, setCurrentSong] = useState(0);
  const songObject = queueState.queue[currentSong];
  const [isShuffle, setIsShuffle] = useState(false);
  // const [repeat, setRepeat] = useState("no");

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

  return (
    <div>
      <AudioPlayer
        // autoPlay
        src={songObject.url}
        header={`${songObject.name} - ${songObject.artist}`}
        showSkipControls
        showJumpControls={false}
        onClickNext={nextSong}
        onClickPrevious={previousSong}
        // onPlay={(e) => {
        //   console.log("e", e);
        // }}
        onEnded={nextSong}
        customAdditionalControls={[
          <button key={songObject.url} onClick={shuffleToggle} type="button">
            SHUFFLE {isShuffle && "🆗"}
          </button>,
        ]}
        // onPlayError={ TODO pop up saying there was an error}
        // onChangeCurrentTimeError={TODO pop up saying there was an error}
      />
    </div>
  );
}
