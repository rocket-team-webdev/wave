import React from "react";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { FaPlay, FaPause, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdRepeat } from "react-icons/io";
import { ImShuffle } from "react-icons/im";

import "./MusicPlayer.scss";

export default function MusicPlayer() {
  const isShuffle = true;
  const isLiked = false;
  return (
    <div className="d-flex audio-player">
      <div className="song-info-wrapper d-flex align-items-center justify-content-between clr-white ps-5 pe-4">
        <div className="thumb-album">
          <img
            src="https://loudcave.es/wp-content/uploads/2021/04/cbf7b52dab62a3eb745e6730068abc4a.1000x1000x1.jpg"
            alt="album-cover"
            className="thumb-album-img"
          />
        </div>
        <button type="button" className="like-button">
          {" "}
          {isLiked ? (
            <FaHeart className="like-icon" />
          ) : (
            <FaRegHeart className="like-icon" />
          )}
        </button>
        <div className="song-text d-flex">
          <p className="song-tittle mb-0 fnt-song-bold lh-1 pe-4">
            Like Toy Soldiers
          </p>
          <p className="artist-tittle mb-0 fnt-song-light lh-1">Eminem</p>
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
        className="pe-5"
        // onPlay={(e) => console.log("onPlay")}
        // other props here
      />
    </div>
  );
}
