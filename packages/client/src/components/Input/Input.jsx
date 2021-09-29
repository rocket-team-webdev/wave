import React, { useState } from "react";

import "./Input.scss";

export default function Input({
  label = false,
  id = "input-01",
  type = "",
  classNames,
  isNegative = false,
  fullWidth = false,
  placeholder = "",
  inputFileText = "Choose your file",
  handleChange = () => {},
  handleBlur = () => {},
  handleInput = () => {},
  errorMessage,
  hasErrorMessage,
  ...props
}) {
  const [fileName, setFileName] = useState(inputFileText);
  const onHandleChange = (e) => {
    setFileName(e.target.files[0]?.name || inputFileText);
    handleChange(e);
  };

  const componentClasses = `${classNames} custom-input d-flex flex-column mb-1`;

  let labelClassNames = "fnt-label-bold p-0 mb-2 ";
  let inputClassNames = "form-input fnt-input-light fx-rounded ps-3 ";
  let uploadClassNames =
    "custom-upload-input fx-rounded fnt-input-light d-flex align-items-center px-3 ";

  if (type === "file") {
    inputClassNames += "upload-input m-0 ";
    if (!isNegative) {
      uploadClassNames += "positive-custom-upload-input truncate ";
    } else {
      uploadClassNames += "negative-custom-upload-input truncate ";
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
      {label && (
        <label className={labelClassNames} htmlFor={id}>
          {label}
        </label>
      )}
      {type === "file" && <div className={uploadClassNames}>{fileName}</div>}
      <input
        type={type}
        className={inputClassNames}
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={onHandleChange}
        onBlur={handleBlur}
        onInput={handleInput}
        {...props}
      />
      {hasErrorMessage && errorMessage ? (
        <p className="error-msg mt-1 mb-0">{errorMessage}</p>
      ) : (
        <p className="error-msg mt-1 mb-0">&nbsp;</p>
      )}
    </div>
  );
}
