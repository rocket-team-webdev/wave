import React from "react";

import "./Input.scss";

export default function FloatInput({
  isUploadFile = false,
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
    <div className="d-flex flex-column mb-1">
      <label className="font-label-light p-0" htmlFor={id}>
        {label.toUpperCase()}
      </label>
      <input
        type={isUploadFile ? "file" : "text"}
        className={`${fullWidth && "w-100"} form-input fx-rounded`}
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
  );
}
