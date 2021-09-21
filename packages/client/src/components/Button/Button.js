import React from "react";

import "./Button.scss";

export default function Button({
  submitButton = false,
  disabled = false,
  classes = "custom-btn",
  children,
  handleClick = () => {},
  ...props
}) {
  return (
    <button
      className={classes}
      type={submitButton ? "submit" : "button"}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
