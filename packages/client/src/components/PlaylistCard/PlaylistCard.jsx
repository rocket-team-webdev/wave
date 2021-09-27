import React from "react";

export default function PlaylistCard({ classNames, playlistName }) {
  const componentClasses = `${classNames} d-flex align-items-end playlist-card clr-light-20 fx-rounded`;
  return (
    <div className={componentClasses}>
      <p className="fnt-input-bold fnt-light ps-3">
        {playlistName.toUpperCase()}
      </p>
    </div>
  );
}
