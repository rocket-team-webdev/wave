import React from "react";

import "./FormWrapper.scss";

function FormWrapper({ formTitle = "Undefined Title", img = false, children }) {
  return (
    <div className="clr-light fx-rounded p-4 mt-5 mt-lg-0">
      <div className="row d-flex justify-content-between align-items-start">
        <h1 className="col-10 fnt-subtitle-bold mb-4">{formTitle}</h1>
        {img && (
          <div className="col col-2 text-end">
            <img className="title-img fx-rounded" src={img} alt="title-img" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export default FormWrapper;
