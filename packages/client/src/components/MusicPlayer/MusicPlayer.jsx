import React from "react";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdRepeat } from "react-icons/io";
import { ImShuffle } from "react-icons/im";

import "./MusicPlayer.scss";

export default function MusicPlayer() {
  const isShuffle = true;
  return (
    <div>
      <AudioPlayer
        // autoPlay
        showSkipControls
        showJumpControls={false}
        src="https://res.cloudinary.com/dz5nspe7f/video/upload/v1632147267/music-uploads/bensound-creativeminds_vjqm2b.mp3"
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
          <div className="rhap_shuffle-controls" key="shuffle">
            <button
              disabled="true"
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
      />
    </div>
  );
}
