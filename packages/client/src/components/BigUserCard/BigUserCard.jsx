import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { fromBottom } from "../../utils/motionSettings";

import { PUBLIC } from "../../constants/routes";

export default function BigUserCard({ user }) {
  return (
    <motion.div
      className="w-100"
      // Animation settings
      variants={fromBottom}
    >
      <Link
        to={`${PUBLIC.USER_VIEW}/${user._id}`}
        className="d-flex align-items-center me-4 mb-2 user-card w-100"
      >
        <FaUserCircle className="fnt-light me-2 fs-4" />
        <p className="mb-0 fnt-caption fnt-light truncate">
          {`${user.firstName} ${user.lastName}`}
        </p>
      </Link>
    </motion.div>
  );
}
