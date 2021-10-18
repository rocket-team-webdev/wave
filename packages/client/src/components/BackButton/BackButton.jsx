import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import "./BackButton.scss";

export default function Button({
  primaryBtn = true,
  secondaryBtn = false,
  isNegative = false,
  isSmall = false,
  isDanger = false,
  fullWidth = false,
  classNames = "",
}) {
  const location = useLocation();
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);

  let btnclassNames = `${classNames} custom-btn fx-rounded d-flex align-items-center `;

  if (isSmall) {
    btnclassNames += "fnt-caption small-btn px-2 ";
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

  if (disabled) {
    btnclassNames += "disabled";
  }

  useEffect(() => {
    if (!location.state) setDisabled(true);
  }, []);

  console.log(location.state);
  const goBack = () => {
    if (location.state) {
      history.push(location.state.referrer);
    }
  };

  return (
    <button
      className={btnclassNames}
      type="button"
      disabled={disabled}
      onClick={goBack}
    >
      Back
    </button>
  );
}
