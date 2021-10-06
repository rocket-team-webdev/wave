import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fromBottom } from "../../utils/motionSettings";

import HeartIcon from "../SVGicons/HeartIcon";
import { PUBLIC } from "../../constants/routes";

import "./playlist-card.scss";
import { followPlaylist } from "../../api/playlists-api";

export default function PlaylistCard({
  playlistId,
  playlistName,
  userId,
  isFollowed,
  colsMd = "6",
  updateFollowedView = () => {},
}) {
  const [followed, setFollowed] = useState(isFollowed);
  const playlistObject = {
    name: playlistName,
    playlistId: playlistId,
    isFollowed: isFollowed,
    userId: userId,
  };

  const handleLike = async () => {
    const userFollows = !followed;
    setFollowed(userFollows);

    try {
      await followPlaylist(playlistId);
      updateFollowedView(
        {
          ...playlistObject,
          isFollowed: userFollows,
          _id: playlistId,
        },
        userFollows,
      );
    } catch (error) {
      toast(error.message, { type: "error" });
      setFollowed(!followed);
    }
  };

  useEffect(() => {
    setFollowed(isFollowed);
  }, [isFollowed]);

  const componentClasses = `col col-12 col-md-${colsMd} col-xl-4 col-xxl-3 p-2`;
  return (
    <Link
      to={`${PUBLIC.MY_PLAYLISTS}/${playlistId}`}
      className={componentClasses}
    >
      <motion.div
        className="d-flex flex-column justify-content-between playlist-card fx-rounded p-3"
        // Animation settings
        variants={fromBottom}
      >
        <div className="heart-wrapper d-flex justify-content-end fnt-primary">
          <button
            className="text-center px-0"
            type="button"
            onClick={handleLike}
          >
            {followed ? <HeartIcon isFull /> : <HeartIcon />}
          </button>
        </div>

        <p className="fnt-input-bold fnt-light mb-0 truncate">
          {playlistName.toUpperCase()}
        </p>
      </motion.div>
    </Link>
  );
}
