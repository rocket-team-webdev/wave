import React from "react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function MusicPlayer() {
  return (
    <div>
      <AudioPlayer
        autoPlay
        src="https://res.cloudinary.com/dz5nspe7f/video/upload/v1632147267/music-uploads/bensound-creativeminds_vjqm2b.mp3"
        // onPlay={(e) => console.log("onPlay")}
        // other props here
      />
    </div>
  );
}
