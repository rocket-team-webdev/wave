import React from "react";

export default function DeleteModal({
  modalTitle = "Modal title",
  modalBody = "Modal body",
  handleSubmit = async () => {},
}) {
  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content fnt-danger">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">
              {modalTitle}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>{modalBody}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary "
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleSubmit}
            >
              Yes!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
