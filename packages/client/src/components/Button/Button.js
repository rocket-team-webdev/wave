import React from "react";

import "./Button.scss";

export default function Button({
  submitButton = false,
  disabled = false,
  fullWidth = false,
  primaryBtn = true,
  secondaryBtn = false,
  children,
  handleClick = () => {},
  ...props
}) {
  return (
    <button
      className={`${fullWidth && "w-100"} ${primaryBtn && "primary-btn"} ${
        secondaryBtn && "secondary-btn"
      } custom-btn `}
      type={submitButton ? "submit" : "button"}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
