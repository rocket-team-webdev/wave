import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { fromBottom } from "../../utils/motionSettings";

import { PUBLIC } from "../../constants/routes";

export default function BigUserCard({ user, classNames = "" }) {
  const componentClasses = `${classNames} d-flex align-items-center artist-card w-100`;
  const location = useLocation();

  return (
    <motion.div
      className=" pe-4 d-flex flex-column align-items-start" // Animation settings
      // className="w-100"
      // Animation settings
      variants={fromBottom}
      // variants={fromRight}
    >
      <Link
        to={{
          pathname: `${PUBLIC.USER_VIEW}/${user._id}`,
          state: {
            referrer: location.pathname,
          },
        }}
        className="d-flex align-items-center me-4 mb-2 user-card w-100"
      >
        <div className={componentClasses}>
          <img
            className="mb-1"
            src={user.profilePicture}
            alt={user.firstName}
          />
          <p className="fnt-light m-0 ms-3 w-fit-content fnt-label-bold w-100">
            {`${user.firstName} ${user.lastName}`}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
