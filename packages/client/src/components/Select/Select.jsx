import React from "react";

import AddIcon from "../SVGicons/AddIcon";
import Button from "../Button";

import "../Input/Input.scss";
import "./Select.scss";

export default function Select({
  label = "input-01",
  id = "input-01",
  classNames,
  value,
  isNegative = false,
  fullWidth = false,
  handleChange = () => {},
  handleBlur = () => {},
  handleAddIcon = () => {},
  hasAddIcon,
  errorMessage,
  hasErrorMessage,
  options = [],
  // ...props
}) {
  let selectClassNames =
    "fnt-input-light fx-rounded positive-input px-3 col custom-select ";
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
      <div
        className={
          hasAddIcon
            ? "d-flex justify-content-between px-0 select-with-add"
            : "col col-12 p-0"
        }
      >
        <select
          className={
            hasAddIcon
              ? `${selectClassNames} flex-select flex-grow-1`
              : `${selectClassNames} form-input col-12`
          }
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          id={id}
          name={id}
          // {...props}
        >
          {options.map((option) => (
            <option key={option} value={option} className="custom-option">
              {option}
            </option>
          ))}
        </select>
        {hasAddIcon && (
          <div className="ps-2 h-100 custom-add-icon">
            <Button isNegative onClick={handleAddIcon}>
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
