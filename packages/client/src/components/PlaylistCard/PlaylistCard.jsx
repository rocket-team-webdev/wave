import React from "react";

export default function PlaylistCard({ classNames, playlistName }) {
  const componentClasses = `${classNames}col col-12 col-md-6 d-flex align-items-end playlist-card fx-rounded`;
  return (
    <div className={componentClasses}>
      <p className="fnt-input-bold fnt-light ps-3">
        {playlistName.toUpperCase()}
      </p>
    </div>
  );
}
