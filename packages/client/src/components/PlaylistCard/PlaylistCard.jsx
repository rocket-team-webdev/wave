import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fromBottom } from "../../utils/motionSettings";

import { DEFAULT_PLAYLIST_THUMBNAIL } from "../../utils/defaultPresets";

import HeartIcon from "../SVGicons/HeartIcon";
import { PUBLIC } from "../../constants/routes";

import "./PlaylistCard.scss";
import { followPlaylist } from "../../api/playlists-api";

export default function PlaylistCard({
  playlistId,
  playlistName,
  userId,
  isFollowed,
  thumbnail,
  bgColor,
  isPlaceholder = false,
  colsMd = "6",
  updateFollowedView = () => {},
}) {
  const location = useLocation();
  const [followed, setFollowed] = useState(isFollowed);
  const playlistObject = {
    name: playlistName,
    playlistId: playlistId,
    isFollowed: isFollowed,
    userId: userId,
    primaryColor: bgColor,
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const userFollows = !followed;

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
      setFollowed(userFollows);
    } catch (error) {
      toast(error.message, { type: "error" });
      setFollowed(!followed);
    }
  };

  let backgroundStyles;
  if (thumbnail === DEFAULT_PLAYLIST_THUMBNAIL) {
    backgroundStyles = {
      backgroundImage: `url(${thumbnail})`,
      backgroundColor: `${playlistObject.primaryColor}`,
    };
  } else {
    backgroundStyles = {
      backgroundImage: `url(${thumbnail})`,
    };
  }

  // console.log("bgStyles", backgroundStyles);

  useEffect(() => {
    setFollowed(isFollowed);
  }, [isFollowed]);

  const componentClasses = `col col-12 col-md-${colsMd} p-2`;
  return (
    <>
      {isPlaceholder ? (
        <Link
          to={{
            pathname: `${PUBLIC.ADD_PLAYLIST}`,
            state: {
              referrer: location.pathname,
            },
          }}
          className={componentClasses}
        >
          <motion.div
            className="d-flex flex-column justify-content-center playlist-card playlist-placeholder fx-rounded clr-light-20 py-3 px-4"
            // Animation settings
            variants={fromBottom}
          >
            <p
              className="fnt-input-bold fnt-light mb-0 truncate text-center"
              data-testid="playlistCard"
            >
              New playlist
            </p>
          </motion.div>
        </Link>
      ) : (
        <Link
          to={{
            pathname: `${PUBLIC.SINGLE_PLAYLIST}/${playlistId}`,
            state: {
              referrer: location.pathname,
            },
          }}
          className={componentClasses}
        >
          <motion.div
            className="d-flex flex-column justify-content-between playlist-card playlist-gradient fx-rounded py-3 px-4 parent-thumbnail-card"
            // style={backgroundStyles}
            // Animation settings
            variants={fromBottom}
          >
            <div className="thumbnail-card" style={backgroundStyles} />
            <div
              className="heart-wrapper d-flex justify-content-end fnt-primary"
              data-testid="playlistCard"
            >
              <button
                className="text-center px-0"
                type="button"
                onClick={handleLike}
              >
                {followed ? (
                  <HeartIcon isFull isNegative />
                ) : (
                  <HeartIcon isNegative />
                )}
              </button>
            </div>

            <p className="fnt-input-bold fnt-light mb-0 truncate">
              {playlistName.toUpperCase()}
            </p>
          </motion.div>
        </Link>
      )}
    </>
  );
}
