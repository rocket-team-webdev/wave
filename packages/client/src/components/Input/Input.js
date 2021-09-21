import React from "react";

import "./Input.scss";

export default function FloatInput({
  type = "text",
  label = "input-01",
  id = "input-01",
  classes = "form-input",
  value = "",
  placeholder = "",
  handleChange = () => {},
  handleBlur = () => {},
  handleInput = () => {},
  errorMessage,
  hasErrorMessage,
  ...props
}) {
  return (
    <>
      <div className="mb-2">
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          className={classes}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onInput={handleInput}
          {...props}
        />
        {hasErrorMessage && errorMessage && (
          <p className="error-msg">{errorMessage}</p>
        )}
      </div>
    </>
  );
}
