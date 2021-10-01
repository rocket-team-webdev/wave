import React from "react";

function BigThumbnail({ image, altText }) {
  return (
    <div className="col col-12 col-md-6 p-4">
      <img src={image} alt={altText} className="clr-light fx-rounded w-100" />
    </div>
  );
}

export default BigThumbnail;
