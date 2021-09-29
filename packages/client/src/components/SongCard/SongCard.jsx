import React, { useState } from "react";

export default function SongCard({
  songNumber = 1,
  songImg,
  songName = "Glory Box",
  artist = "Portishead",
  albumName = "Dummy",
  time = "3:45",
}) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="col col-12 border d-flex align-items-center justify-content-between">
      <p className="m-0">{songNumber}</p>
      <div className="clr-light border">
        <img src={songImg} alt={songName} />
      </div>
      <div className="heart-wrapper d-flex justify-content-end fnt-primary">
        <button className="heart-button" type="button" onClick={handleLike}>
          {isLiked ? (
            <i className="fas fa-heart fnt-secondary" />
          ) : (
            <i className="far fa-heart fnt-secondary" />
          )}
        </button>
      </div>
      <h5>{songName}</h5>
      <h6>{artist}</h6>
      <h6>{albumName}</h6>
      <h6>{time}</h6>
      <div>···</div>
    </div>
  );
}
