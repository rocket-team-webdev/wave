import React, { useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import "./Toast.scss";

export default function Toast() {
  const fer = useRef([]);

  // var toastTrigger = document.getElementById("liveToastBtn");
  // var toastLiveExample = document.getElementById("liveToast");
  // if (toastTrigger) {
  //   toastTrigger.addEventListener("click", function () {
  //     var toast = new bootstrap.Toast(toastLiveExample);

  //     toast.show();
  //   });
  // }

  const handler = () => {
    fer.current.forEach((element) => {
      const toast = new bootstrap.Toast(element);
      toast.show();
    });
  };

  return (
    <>
      <button
        type="button"
        classNameName="btn btn-primary"
        id="liveToastBtn"
        onClick={handler}
      >
        Show live toast
      </button>

      <div className="toast-container position-fixed end-0 top-0 p-5">
        <div
          className="toast align-items-center clr-danger position-relative"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          ref={(element) => {
            fer.current.push(element);
          }}
        >
          <div className="d-flex">
            <div className="toast-body fnt-danger">
              Hello, world! This is a toast message.
            </div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            />
          </div>
        </div>
        <div
          className="toast align-items-center clr-danger position-relative"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          ref={(element) => {
            fer.current.push(element);
          }}
        >
          <div className="d-flex">
            <div className="toast-body fnt-danger">Test.</div>
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
