import React from "react";

import AddIcon from "../SVGicons/AddIcon";
import Button from "../Button";

import "../Input/Input.scss";
import "./Select.scss";

export default function Select({
  label = "input-01",
  id = "input-01",
  classNames,
  // value,
  isNegative = false,
  fullWidth = false,
  handleChange = () => {},
  handleBlur = () => {},
  hasAddIcon,
  errorMessage,
  hasErrorMessage,
  options = [],
  // ...props
}) {
  let selectClassNames =
    "form-input fnt-input-light fx-rounded positive-input px-3 col col-12 custom-select ";
  let labelClassNames = "label-select fnt-label-bold mb-2 col col-12 p-0 ";
  const errorClassNames = "error-msg fnt-smallest mt-2 mb-0 ps-1 col col-12 ";

  if (isNegative) {
    labelClassNames += "negative-select-label";
    selectClassNames += "custom-negative-select";
  } else {
    labelClassNames += "positive-select-label";
    selectClassNames += "custom-positive-select";
  }

  if (fullWidth) {
    selectClassNames += " w-100";
  }
  return (
    <div
      className={`${
        fullWidth && "w-100"
      } ${classNames} d-flex flex-column mb-1 row m-0`}
    >
      <label className={labelClassNames} htmlFor={id}>
        {label}
      </label>
      <div className={hasAddIcon ? "col col-12 d-flex p-0" : "col col-12 p-0"}>
        <select
          className={
            hasAddIcon ? `${selectClassNames} col-md-10` : selectClassNames
          }
          // value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          id={id}
          name={id}
          // {...props}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {hasAddIcon && (
          <div className="ps-2 h-100 col col-12 col-md-2">
            <Button isNegative /* onClick={handleCreateAlbum} */>
              <AddIcon size={25} />
            </Button>
          </div>
        )}
      </div>
      {hasErrorMessage && errorMessage ? (
        <p className={errorClassNames}>{errorMessage}</p>
      ) : (
        <p className={errorClassNames}>&nbsp;</p>
      )}
    </div>
  );
}
