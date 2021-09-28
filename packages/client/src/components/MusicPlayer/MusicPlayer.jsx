import React from "react";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { FaPlay, FaPause, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdRepeat } from "react-icons/io";
import { ImShuffle } from "react-icons/im";

import "./MusicPlayer.scss";

export default function MusicPlayer() {
  const isShuffle = true;
  const isLiked = true;
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
        <button type="button" className="rhap_like-button">
          {" "}
          {isLiked ? (
            <FaHeart className="rhap_like-icon" />
          ) : (
            <FaRegHeart className="rhap_like-icon" />
          )}
        </button>
        <div className="rhap_song-text">
          <p className="rhap_song-tittle mb-0 fnt-song-bold lh-1 pe-4">
            Like Toy Soldiers
          </p>
          <p className="rhap_song-artist mb-0 fnt-song-light lh-1">Eminem</p>
        </div>
      </div>
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
