import React, { useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import "./Toast.scss";

export default function Toast() {
  const fer = useRef();

  // var toastTrigger = document.getElementById("liveToastBtn");
  // var toastLiveExample = document.getElementById("liveToast");
  // if (toastTrigger) {
  //   toastTrigger.addEventListener("click", function () {
  //     var toast = new bootstrap.Toast(toastLiveExample);

  //     toast.show();
  //   });
  // }

  const handler = () => {
    const toast = new bootstrap.Toast(fer.current);
    toast.show();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        id="liveToastBtn"
        onClick={handler}
      >
        Show live toast
      </button>

      <div className="toast-container">
        <div
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          ref={fer}
        >
          <div className="toast-header">
            {/* <img src="..." className="rounded me-2" alt="..." /> */}
            <strong className="me-auto">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              perferendis ab vero libero? Quia neque cumque rerum. Cumque
              corporis earum commodi iure? Odio vitae qui, facilis quidem a
              harum quod!
            </strong>
            {/* <small className="text-muted">2 seconds ago</small> */}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            />
          </div>
          {/* <div className="toast-body">{errorMessage}</div> */}
        </div>
      </div>
    </>
  );
}
