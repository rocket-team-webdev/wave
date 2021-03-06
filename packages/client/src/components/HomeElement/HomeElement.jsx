import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowCircleRight } from "react-icons/fa";
import { containerAnimation } from "../../utils/motionSettings";

import "./HomeElement.scss";

export default function HomeElement({
  label,
  sublabel = false,
  to = false,
  cols = "12",
  isAnimationContainer,
  children,
}) {
  const location = useLocation();
  let contentClasses = "content d-flex flex-wrap";

  // Apply gutters to playlists/albums cards
  if (label.includes("laylists") || label.includes("lbums")) {
    contentClasses += " row";
  }

  return (
    <>
      {isAnimationContainer ? (
        <motion.div
          className={`home-element col col-12 col-md-${cols}`}
          // Animation settings
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          <div className="p-0 mx-0">
            <div className="d-flex justify-content-between home-element-header pt-2">
              <p className="fnt-label-bold fnt-secondary mb-3 truncate home-element-title">
                {label.toUpperCase()}
              </p>
              {to && (
                <Link
                  to={{
                    pathname: `${to}`,
                    state: {
                      referrer: location.pathname,
                    },
                  }}
                  className="mb-2 fnt-smallest fnt-secondary"
                >
                  See all
                  <FaArrowCircleRight className="ms-2 fnt-secondary" />
                </Link>
              )}
              {sublabel && (
                <p className="fnt-label-light fnt-secondary mb-3 truncate home-element-title">
                  {sublabel}
                </p>
              )}
            </div>
            <div className={contentClasses}>{children}</div>
          </div>
        </motion.div>
      ) : (
        <div className={`home-element mb-4 col col-12 col-md-${cols}`}>
          <div className="p-0 mx-0">
            <div className="d-flex justify-content-between home-element-header pt-2">
              <p className="fnt-label-bold fnt-secondary mb-3 truncate home-element-title">
                {label.toUpperCase()}
              </p>
              {to && (
                <Link
                  to={{
                    pathname: `${to}`,
                    state: {
                      referrer: location.pathname,
                    },
                  }}
                  className="mb-2 fnt-smallest fnt-secondary"
                >
                  See all
                  <FaArrowCircleRight className="ms-2" />
                </Link>
              )}
            </div>
            <div className={contentClasses}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
