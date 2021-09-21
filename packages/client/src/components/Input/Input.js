import React from "react";

import "./Input.scss";

export default function FloatInput({
  type = "text",
  label = "input-01",
  id = "input-01",
  fullWidth = false,
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
          className={`${fullWidth && "w-100"} form-input`}
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
