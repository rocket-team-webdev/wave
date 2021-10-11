import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerAnimation } from "../../utils/motionSettings";

import "./HomeElement.scss";

export default function HomeElement({
  label,
  to = "/",
  cols = "12",
  isAnimationContainer,
  children,
}) {
  let contentClasses = "content d-flex flex-wrap";

  // Apply gutters to playlists/albums cards
  if (label.includes("laylists") || label.includes("lbums")) {
    contentClasses += " row";
  }

  return (
    <>
      {isAnimationContainer ? (
        <motion.div
          className={`mb-4 col col-12 col-md-${cols}`}
          // Animation settings
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          <div className="p-0 mx-0">
            <div className="d-flex justify-content-between align-items-center home-element-header pt-2">
              <p className="fnt-label-bold mb-3 truncate home-element-title">
                {label.toUpperCase()}
              </p>
              <Link to={to} className="mb-2 fnt-smallest">
                See all
                <i className="ms-2 fas fa-arrow-circle-right" />
              </Link>
            </div>
            <div className={contentClasses}>{children}</div>
          </div>
        </motion.div>
      ) : (
        <div className={`mb-4 col col-12 col-md-${cols}`}>
          <div className="p-0 mx-0">
            <div className="d-flex justify-content-between align-items-center home-element-header pt-2">
              <p className="fnt-label-bold mb-3 truncate home-element-title">
                {label.toUpperCase()}
              </p>
              <Link to={to} className="mb-2 fnt-smallest">
                See all
                <i className="ms-2 fas fa-arrow-circle-right" />
              </Link>
            </div>
            <div className={contentClasses}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
