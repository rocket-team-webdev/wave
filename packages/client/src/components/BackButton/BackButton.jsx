import React /* useEffect,  useState */ from "react";
import { useLocation, useHistory } from "react-router-dom";
import { PUBLIC } from "../../constants/routes";

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

  const goBack = () => {
    if (location.state) {
      history.push(location.state.referrer);
    } else {
      history.push(`${PUBLIC.HOME}`);
    }
  };

  return (
    <button className={btnclassNames} type="button" onClick={goBack}>
      Back
    </button>
  );
}
