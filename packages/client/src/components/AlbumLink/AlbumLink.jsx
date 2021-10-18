import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaCompactDisc } from "react-icons/fa";
import { fromBottom } from "../../utils/motionSettings";

import { PUBLIC } from "../../constants/routes";

import "./AlbumLink.scss";

export default function AlbumLink({ albumId, albumTitle }) {
  const location = useLocation();

  return (
    <motion.div
      className="w-100"
      // Animation settings
      variants={fromBottom}
    >
      <Link
        to={{
          pathname: `${PUBLIC.ALBUM}/${albumId}`,
          state: {
            referrer: location.pathname,
          },
        }}
        className="d-flex align-items-center me-4 mb-2 user-card w-100"
      >
        <FaCompactDisc className="fnt-light fnt-input-bold me-2" />
        <p className="mb-0 fnt-caption fnt-light truncate">{albumTitle}</p>
      </Link>
    </motion.div>
  );
}
