import React from "react";

import "./Button.scss";

export default function Button({
  submitButton = false,
  disabled = false,
  fullWidth = false,
  primaryBtn = true,
  secondaryBtn = false,
  // smallButton = false,
  isPositive = true,
  isSmall = false,
  children,
  handleClick = () => {},
  ...props
}) {
  return (
    <button
      className={` ${primaryBtn && "primary-btn"} ${
        isPositive && "positive-btn"
      } ${secondaryBtn && "secondary-btn"}
      ${isSmall ? "small-btn" : "large-btn .font-label-light"}  
      ${fullWidth && "w-100"}
      custom-btn fx-rounded`}
      type={submitButton ? "submit" : "button"}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
