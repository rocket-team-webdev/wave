import React from "react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdRepeat } from "react-icons/io";

import "./MusicPlayer.scss";

export default function MusicPlayer() {
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
        // onPlay={(e) => console.log("onPlay")}
        // other props here
      />
    </div>
  );
}
