import React, { useState /* , useEffect */ } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fromBottom } from "../../utils/motionSettings";

import HeartIcon from "../SVGicons/HeartIcon";
import { PUBLIC } from "../../constants/routes";

import "./playlist-card.scss";

export default function PlaylistCard({
  playlistId,
  playlistName,
  userId,
  isLiked,
  // classNames,
  colsMd = "6",
  // updateFollowedView = () => {},
}) {
  const [liked, setLiked] = useState(isLiked);
  // const playlistObject = {
  //   name: playlistName,
  //   playlistId: playlistId,
  //   isLiked: isLiked,
  //   userId: userId,
  // };

  const userState = useSelector((state) => state.user);

  console.log(userState, userId);

  // const handleIsOwned = () => {
  //   if (userId === userState.mongoId) {
  //     setIsOwned(true);
  //   }
  // };

  const handleLike = async () => {
    const userLike = !liked;
    setLiked(userLike);

    // try {
    //   await followPlaylist(trackId);
    //   updateFollowedView(
    //     {
    //       ...playlistObject,
    //       isLiked: userLike,
    //       _id: playlistId,
    //     },
    //     userLike,
    //   );
    // } catch (error) {
    //   toast(error.message, { type: "error" });
    //   setLiked(!liked);
    // }
  };

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
            {isLiked ? <HeartIcon isFull /> : <HeartIcon />}
          </button>
        </div>

        <p className="fnt-input-bold fnt-light mb-0 truncate">
          {playlistName.toUpperCase()}
        </p>
      </motion.div>
    </Link>
  );
}
