import React from "react";

import "./Input.scss";

export default function FloatInput({
  label = "input-01",
  id = "input-01",
  isNegative = false,
  isUploadFile = false,
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
  let labelClassNames = "fnt-label-light p-0 ";
  let inputClassNames = "form-input fnt-input-light fx-rounded ps-3 ";
  let uploadClassNames =
    "custom-upload-input fx-rounded fnt-input-light d-flex align-items-center ps-3 w-100 ";

  if (isUploadFile) {
    if (!isNegative) {
      uploadClassNames += "positive-custom-upload-input";
    } else {
      uploadClassNames += "negative-custom-upload-input";
    }

    inputClassNames += "upload-input";
  }

  if (isNegative) {
    labelClassNames += "negative-label";
    inputClassNames += "negative-input";
  } else {
    labelClassNames += "positive-label";
    inputClassNames += "positive-input";
  }

  if (fullWidth) {
    inputClassNames += " w-100";
  }

  return (
    <div className="custom-input d-flex flex-column mb-1">
      <label className={labelClassNames} htmlFor={id}>
        {label}
      </label>
      {isUploadFile && (
        <div className={uploadClassNames}>{placeholder} for upload file</div>
      )}
      <input
        type={isUploadFile ? "file" : "text"}
        className={inputClassNames}
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
