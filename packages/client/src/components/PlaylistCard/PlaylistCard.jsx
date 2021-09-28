import React, { useState } from "react";

export default function PlaylistCard({
  classNames,
  playlistName,
  hasHeart = false,
}) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const componentClasses = `${classNames}col col-12 col-md-6 d-flex flex-column justify-content-between playlist-card fx-rounded p-4`;
  return (
    <div className={componentClasses}>
      <div className="heart-wrapper d-flex justify-content-end fnt-primary">
        {hasHeart ? (
          <button className="heart-button" type="button" onClick={handleLike}>
            {isLiked ? (
              <i className="fas fa-heart fnt-secondary" />
            ) : (
              <i className="far fa-heart fnt-secondary" />
            )}
          </button>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>

      <p className="fnt-input-bold fnt-light mb-0 truncate">
        {playlistName.toUpperCase()}
      </p>
    </div>
  );
}
