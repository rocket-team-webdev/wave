import React from "react";

function FormWrapper({ formTitle = "Undefined Title", children }) {
  return (
    <div className="clr-light fx-rounded p-4">
      <div className="row">
        <h1 className="col-12 fnt-subtitle-bold mb-4">{formTitle}</h1>
      </div>
      {children}
    </div>
  );
}

export default FormWrapper;
