import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fromBottom } from "../../utils/motionSettings";

import { PUBLIC } from "../../constants/routes";

import "./UserCard.scss";

export default function UserCard({ userId, userName }) {
  return (
    <motion.div
      // className=""
      // Animation settings
      variants={fromBottom}
    >
      <Link
        to={`${PUBLIC.USER_VIEW}/${userId}`}
        className="d-flex align-items-center me-4 mb-2 user-card "
      >
        <i className="fas fa-user-circle fnt-light me-2 fs-4" />
        <p className="mb-0 fnt-caption fnt-light truncate">{userName}</p>
      </Link>
    </motion.div>
  );
}
