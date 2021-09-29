import React from "react";

import "../Input/Input.scss";

export default function Select({
  label = "input-01",
  id = "input-01",
  classNames,
  // value,
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
      <label className="label-select fnt-input-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <select
        className="form-input fnt-input-light fx-rounded positive-input ps-3"
        // value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        id={id}
        name={id}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {hasErrorMessage && errorMessage ? (
        <p className="error-msg mt-1 mb-0">{errorMessage}</p>
      ) : (
        <p className="error-msg mt-1 mb-0">&nbsp;</p>
      )}
    </div>
  );
}
