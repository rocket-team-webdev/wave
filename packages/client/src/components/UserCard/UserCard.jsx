/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { BiUserCircle, BiUserCheck, BiUserPlus } from "react-icons/bi";
import { toast } from "react-toastify";

import { fromBottom } from "../../utils/motionSettings";

import { PUBLIC } from "../../constants/routes";
import { getMyFollowings } from "../../api/me-api";
import { followUser } from "../../api/users-api";

import "./UserCard.scss";

export default function UserCard({ userId, userName, isPopularView }) {
  const [userFollows, setUserFollows] = useState(false);
  const [popularUserIcon, setPopularUserIcon] = useState(false);

  const userState = useSelector((state) => state.user);

  const location = useLocation();

  if (isPopularView) {
    // Follow user
    const handleFollow = async () => {
      try {
        await followUser(userId);
        setUserFollows(!userFollows);
      } catch (error) {
        toast(error.message, { type: "error" });
      }
    };

    const loadUserFollows = async () => {
      try {
        const { data } = await getMyFollowings();
        const idArr = data.data.map((user) => user._id);
        if (idArr.includes(userId)) {
          setUserFollows(true);
        }

        if (userId === userState.mongoId) {
          setPopularUserIcon(
            <div className="px-0">
              <BiUserCircle className="fnt-light me-2 fs-4 circle-icon" />
            </div>,
          );
        } else if (userFollows) {
          setPopularUserIcon(
            <button type="button" className="px-0 ps-1" onClick={handleFollow}>
              <BiUserCheck className="fnt-light me-2 fs-4" />
            </button>,
          );
        } else {
          setPopularUserIcon(
            <button type="button" className="px-0 ps-1" onClick={handleFollow}>
              <BiUserPlus className="fnt-light me-2 fs-4" />
            </button>,
          );
        }
      } catch (error) {
        toast(error.message, { type: "error" });
      }
    };

    // Default loading
    useEffect(() => {
      loadUserFollows();
    }, []);

    // Rerendering on handleFollow
    useEffect(() => {
      loadUserFollows();
    }, [userFollows]);
  }

  return (
    <motion.div
      className="w-100"
      // Animation settings
      variants={fromBottom}
    >
      <div className="d-flex align-items-center me-4 mb-2 user-card w-100">
        {isPopularView ? (
          popularUserIcon
        ) : (
          <BiUserCircle className="fnt-light me-3 fs-4" />
        )}
        <Link
          to={{
            pathname: `${PUBLIC.USER_VIEW}/${userId}`,
            state: {
              referrer: location.pathname,
            },
          }}
        >
          <p className="mb-0 fnt-caption fnt-light truncate">{userName}</p>
        </Link>
      </div>
    </motion.div>
  );
}
