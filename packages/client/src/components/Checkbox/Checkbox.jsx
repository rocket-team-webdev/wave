import React from "react";

import "./Checkbox.scss";

const Checkbox = React.forwardRef((props, ref) => {
  return (
    <div className="col col-12 w-fit-content checkbox-wrapper d-flex align-items-center">
      <div className="d-flex me-2 custom-input-wrapper">
        <input
          type="checkbox"
          onChange={props.onChange}
          className=""
          id={props.id}
          checked={props.checked}
          ref={ref}
          {...props}
        />
        <div className="custom-checkbox" />
      </div>

      <label htmlFor={props.id} className="fnt-caption m-0">
        {props.label}
      </label>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
