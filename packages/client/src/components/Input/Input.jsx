import React from "react";

import "./Input.scss";

export default function Input({
  label = "input-01",
  id = "input-01",
  type = "",
  classNames,
  isNegative = false,
  fullWidth = false,
  placeholder = "",
  handleChange = () => {},
  handleBlur = () => {},
  handleInput = () => {},
  errorMessage,
  hasErrorMessage,
  ...props
}) {
  const componentClasses = `${classNames} custom-input d-flex flex-column mb-1`;

  let labelClassNames = "fnt-label-light p-0 ";
  let inputClassNames = "form-input fnt-input-light fx-rounded ps-3 ";
  let uploadClassNames =
    "custom-upload-input fx-rounded fnt-input-light d-flex align-items-center ps-3 w-100 ";

  if (type === "file") {
    inputClassNames += "upload-input m-0 ";
    if (!isNegative) {
      uploadClassNames += "positive-custom-upload-input";
    } else {
      uploadClassNames += "negative-custom-upload-input";
    }
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
    <div className={componentClasses}>
      <label className={labelClassNames} htmlFor={id}>
        {label}
      </label>
      {type === "file" && <div className={uploadClassNames}>{placeholder}</div>}
      <input
        type={type}
        className={inputClassNames}
        id={id}
        name={id}
        placeholder={placeholder}
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
