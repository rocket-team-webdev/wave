import React from "react";

function SorterElement({ title, orderIcon, handleClick }) {
  return (
    <div
      type="button"
      className="m-0 px-2 fnt-song-bold d-flex align-items-center"
      aria-hidden="true"
      onClick={handleClick}
    >
      <h3 className="text-start fnt-sorter fnt-light me-1 m-0">{title}</h3>
      {orderIcon}
    </div>
  );
}

export default SorterElement;
