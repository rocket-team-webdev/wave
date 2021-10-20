import React from "react";
import Button from "../Button";

import "./DeleteModal.scss";

export default function DeleteModal({
  id,
  modalTitle = "Modal title",
  modalBody = "Modal body",
  handleSubmit = async () => {},
}) {
  return (
    <div
      className="modal fade custom-modal"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content clr-danger p-4 ">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <h5
              className="modal-title fnt-form-title fnt-light"
              id={`${id}Label`}
            >
              {modalTitle.toUpperCase()}
            </h5>
            {/* <Button
              type="button"
              className="btn-close fnt-light"
              data-bs-dismiss="modal"
              aria-label="Close"
            /> */}
          </div>
          <div className="mb-4 ">
            <p className="fnt-label-light fnt-danger">{modalBody}</p>
          </div>
          <div className="d-flex justify-content-end gap-3">
            <Button type="button" isSmall data-bs-dismiss="modal">
              Cancel
            </Button>
            <Button
              type="submit"
              isDanger
              data-bs-dismiss="modal"
              onClick={handleSubmit}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
