import React from "react";

import "./Button.scss";

export default function Button({
  primaryBtn = true,
  secondaryBtn = false,
  isNegative = false,
  isSmall = false,
  isDanger = false,
  fullWidth = false,
  submitButton = false,
  disabled = false,
  classNames = "",
  children,
  handleClick = () => {},
  ...props
}) {
  let btnclassNames = `${classNames} custom-btn fx-rounded d-flex align-items-center justify-content-center `;

  if (isSmall) {
    btnclassNames += "fnt-caption px-2 text-center follow-btn ";
    if (isNegative) {
      btnclassNames += "small-btn-negative";
    } else {
      btnclassNames += "small-btn-positive ";
    }
  } else {
    btnclassNames += "fnt-label-bold large-btn p-2 px-3 ";
    if (isDanger) {
      btnclassNames += " danger-btn ";
    } else if (primaryBtn && !isNegative && !secondaryBtn) {
      btnclassNames += "positive-primary-btn ";
    } else if (primaryBtn && isNegative && !secondaryBtn) {
      btnclassNames += "negative-primary-btn ";
    } else if (secondaryBtn && !isNegative) {
      btnclassNames += "positive-secondary-btn ";
    } else {
      btnclassNames += "negative-secondary-btn ";
    }
  }

  if (fullWidth) {
    btnclassNames += " w-100";
  }

  return (
    <button
      className={btnclassNames}
      type={submitButton ? "submit" : "button"}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
