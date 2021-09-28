import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import { useSelector, useDispatch } from "react-redux";

import "react-h5-audio-player/lib/styles.css";
import { clearShuffle, setShuffle } from "../../redux/music-queue/actions";
// import { setQueue } from "../../redux/music-queue/actions";

export default function MusicPlayer() {
  const queueState = useSelector((state) => state.queue);
  const dispatch = useDispatch();
  const [listPosition, setListPosition] = useState(0);
  const songObject = queueState.isShuffled
    ? queueState.queue[queueState.shuffleOrder[listPosition]]
    : queueState.queue[listPosition];
  const [isShuffle, setIsShuffle] = useState(false);
  // const [repeat, setRepeat] = useState("no");

  const nextSong = () => {
    if (queueState.queue.length > listPosition + 1)
      setListPosition(listPosition + 1);
    // TODO: else disable next button
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
