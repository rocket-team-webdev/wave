import React from "react";

import "./FormWrapper.scss";

function FormWrapper({ formTitle = "Undefined Title", img = false, children }) {
  return (
    <div className="clr-light fx-rounded p-4">
      <div className="row d-flex justify-content-between align-items-center">
        <h1 className="col-10 fnt-subtitle-bold mb-4">{formTitle}</h1>
        {img && (
          <div className="col text-end">
            <img className="title-img fx-rounded" src={img} alt="title-img" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export default FormWrapper;
