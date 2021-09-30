import React from "react";
import { Link } from "react-router-dom";

import "./HomeElement.scss";

export default function HomeElement({
  label,
  to = "/",
  cols = "12",
  children,
}) {
  let contentClasses = "content d-flex flex-wrap";
  // Apply gutters to playlists/albums cards
  if (label.includes("playlists") || label.includes("albums")) {
    contentClasses += " row g-3";
  }

  return (
    <div className={`col col-12 col-md-${cols}`}>
      <div className="p-0 mx-0">
        <div className="d-flex justify-content-between align-items-center">
          <p className="fnt-label-bold mb-2 truncate home-element-title">
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
  );
}
