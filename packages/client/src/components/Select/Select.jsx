import React from "react";

import "../Input/Input.scss";

export default function Select({
  label = "input-01",
  id = "input-01",
  classNames,
  fullWidth = false,
  handleChange = () => {},
  handleBlur = () => {},
  errorMessage,
  hasErrorMessage,
  options = [],
  ...props
}) {
  return (
    <div
      className={`${
        fullWidth && "w-100"
      } ${classNames} d-flex flex-column mb-1`}
    >
      <label className="label-select fnt-label-light" htmlFor="gender">
        {label}
      </label>
      <select
        label="GENDER"
        className="form-input fnt-input-light fx-rounded positive-input ps-3"
        value={id}
        onChange={handleChange}
        onBlur={handleBlur}
        id={id}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
