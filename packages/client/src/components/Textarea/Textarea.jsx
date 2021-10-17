import React from "react";

import "./Textarea.scss";

export default function Textarea({
  label = false,
  id = "input-01",
  rows,
  classNames,
  isNegative = false,
  fullWidth = false,
  placeholder = "",
  handleChange = () => {},
  handleBlur = () => {},
  errorMessage,
  hasErrorMessage,
  hasForgotPassword,
  ...props
}) {
  const componentClasses = `${classNames} custom-input d-flex flex-column mb-3`;
  const errorClassNames = "col col-12 error-msg fnt-smallest mt-2 mb-0 ps-3 ";

  let labelClassNames = "fnt-label-bold p-0 mb-2 ";
  let areaClassNames = "fnt-input-light fx-rounded ps-3 pt-2 ";

  if (isNegative) {
    labelClassNames += "negative-label";
    areaClassNames += "negative-input";
  } else {
    labelClassNames += "positive-label";
    areaClassNames += "positive-input";
  }

  if (fullWidth) {
    areaClassNames += " w-100";
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

      <textarea
        className={areaClassNames}
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />

      <div className="row ">
        {hasErrorMessage && errorMessage ? (
          <p className={errorClassNames}>{errorMessage}</p>
        ) : (
          <p className={errorClassNames}>&nbsp;</p>
        )}
      </div>
    </div>
  );
}
