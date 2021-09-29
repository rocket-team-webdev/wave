import React from "react";

export default function ArtistCard({ classNames, artistName }) {
  const componentClasses = `${classNames} d-flex flex-column align-items-center artist-card fx-rounded`;

  const imageURL =
    "https://images.unsplash.com/photo-1593659238861-ee6e27fb9855?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1064&q=80";
  return (
    <div className=" pe-4 pb-4 d-flex flex-column align-items-start">
      <div className={componentClasses}>
        <img className="mb-1" src={imageURL} alt={artistName} />
        <p className="fnt-caption fnt-light text-center m-0 truncate">
          {artistName}
        </p>
      </div>
    </div>
  );
}
