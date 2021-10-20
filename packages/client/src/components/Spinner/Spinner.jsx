import React from "react";

export default function Spinner({ classNames, isNegative = false }) {
  const spinnerClassNames = classNames;

  return (
    <div
      className={
        isNegative
          ? `${spinnerClassNames} spinner-grow text-light `
          : `${spinnerClassNames} spinner-grow text-dark `
      }
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
