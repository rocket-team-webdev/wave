import React, { useState } from "react";
import { Link } from "react-router-dom";

import { PUBLIC } from "../../constants/routes";

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
  acceptFiles = "image/*",
  handleChange = () => {},
  handleBlur = () => {},
  handleInput = () => {},
  errorMessage,
  hasErrorMessage,
  hasForgotPassword,
  ...props
}) {
  const [fileName, setFileName] = useState(inputFileText);
  const onHandleChange = (e) => {
    setFileName(e.target.files[0]?.name || inputFileText);
    handleChange(e);
  };

  const componentClasses = `${classNames} custom-input d-flex flex-column mb-3`;
  const errorClassNames = "col col-12 error-msg fnt-smallest mt-2 mb-0 ps-3 ";

  let labelClassNames = "fnt-label-bold p-0 mb-2 ";
  let inputClassNames = "form-input fnt-input-light fx-rounded ps-3 ";
  let uploadClassNames =
    "form-input positive-custom-upload-input fx-rounded file-input-wrapper ps-0";

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
      {label ? (
        <label className={labelClassNames} htmlFor={id}>
          {label}
        </label>
      ) : (
        <label className={labelClassNames} htmlFor={id}>
          &nbsp;
        </label>
      )}
      {type === "file" ? (
        <div className={uploadClassNames}>
          <div className="custom-upload-input fnt-input-light d-flex align-items-center px-3 truncate no-overflow">
            {fileName}
          </div>
          <input
            type={type}
            className="upload-input"
            id={id}
            name={id}
            placeholder={placeholder}
            onChange={onHandleChange}
            onBlur={handleBlur}
            onInput={handleInput}
            accept={acceptFiles}
            // onClick={(e) => InDragAndDrop && e.preventDefault()}
            {...props}
          />
        </div>
      ) : (
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
      )}

      <div className="row ">
        {hasErrorMessage && errorMessage ? (
          <p
            className={
              hasForgotPassword
                ? `${errorClassNames} col-md-6`
                : errorClassNames
            }
          >
            {errorMessage}
          </p>
        ) : (
          <p
            className={
              hasForgotPassword
                ? `${errorClassNames} col-md-6`
                : errorClassNames
            }
          >
            &nbsp;
          </p>
        )}
        {hasForgotPassword && (
          <p className="col col-12 col-md-6 mt-2 mb-0 fnt-smallest text-end">
            Forgot your password? Reset it{" "}
            <Link to={PUBLIC.RESET_PASSWORD}>here.</Link>
          </p>
        )}
      </div>
    </div>
  );
}
