import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function PlaylistCard({
  // playlistId,
  playlistName,
  userId,
  classNames,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isOwned, setIsOwned] = useState(false);

  const userState = useSelector((state) => state.user);

  const handleIsOwned = () => {
    if (userId === userState.mongoId) {
      setIsOwned(true);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    handleIsOwned();
  }, []);

  const componentClasses = `${classNames} d-flex flex-column justify-content-between playlist-card fx-rounded p-4`;
  return (
    <div className="col col-12 col-md-6">
      <div className={componentClasses}>
        <div className="heart-wrapper d-flex justify-content-end fnt-primary">
          {!isOwned ? (
            <button className="heart-button" type="button" onClick={handleLike}>
              {/* TODO add like dislike playlist */}
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
    </div>
  );
}
