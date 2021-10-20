import React, { useRef, useEffect } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import "./Toast.scss";

export default function Toast({ warning, message = "message", props }) {
  const toastRef = useRef([]);

  useEffect(() => {
    toastRef.current.forEach((element) => {
      const toast = new bootstrap.Toast(element);
      toast.show();
    });
  }, []);

  let classNames = "toast align-items-center position-relative ";

  if (warning) {
    classNames += "clr-warning ";
  } else {
    classNames += "clr-danger ";
  }

  return (
    <>
      {/* <button
        type="button"
        classNameName="btn btn-primary"
        id="liveToastBtn"
        onClick={handler}
      >
        Show live toast
      </button> */}

      <div className="toast-container position-fixed end-0 top-0 p-5">
        <div
          className={classNames}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          ref={(element) => {
            toastRef.current.push(element);
          }}
          {...props}
        >
          <div className="d-flex">
            <div className="toast-body fnt-danger">{message}</div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            />
          </div>
        </div>
      </div>
    </>
  );
}
