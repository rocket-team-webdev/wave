import React from "react";
import { motion } from "framer-motion";
import { fromBottom } from "../../utils/motionSettings";

import "./UserCard.scss";

export default function UserCard({ userName }) {
  return (
    <motion.div
      className="d-flex align-items-center fnt-light me-4 mb-2 user-card"
      // Animation settings
      variants={fromBottom}
    >
      <i className="fas fa-user-circle me-2 fs-4" />
      <p className="mb-0 fnt-caption truncate">{userName}</p>
    </motion.div>
  );
}
