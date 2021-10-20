import React from "react";

import "./FormWrapper.scss";

function FormWrapper({ formTitle = "Undefined Title", img = false, children }) {
  const titleClasses = "fnt-subtitle-bold mb-4";
  return (
    <div className="clr-light fx-rounded p-4 mt-5 mt-lg-0">
      <div className="row d-flex justify-content-between align-items-start">
        <h1
          className={img ? `${titleClasses} col-9` : `${titleClasses} col-12`}
        >
          {formTitle}
        </h1>
        {img && (
          <div className="col col-2 w-fit-content">
            <img className="title-img fx-rounded" src={img} alt="title-img" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export default FormWrapper;
