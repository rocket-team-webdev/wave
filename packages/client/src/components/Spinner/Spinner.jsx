import React from "react";

export default function Spinner({ isNegative = false }) {
  return (
    <div
      className={
        isNegative ? "spinner-grow text-light " : "spinner-grow text-dark "
      }
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
