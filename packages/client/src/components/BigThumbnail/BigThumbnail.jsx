import React from "react";

import "./BigThumbnail.scss";

function BigThumbnail({ image, altText }) {
  return (
    <div className="col col-12 col-md-6 px-3 py-4 pb-0">
      <img
        src={image}
        alt={altText}
        className="clr-light fx-rounded w-100  h-100 big-thumbnail"
      />
    </div>
  );
}

export default BigThumbnail;
