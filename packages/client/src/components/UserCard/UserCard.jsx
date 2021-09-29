import React from "react";

export default function UserCard({ userName }) {
  return (
    <div className="d-flex align-items-center fnt-light me-4">
      <i className="fas fa-user-circle me-2 fs-4" />
      <p className="mb-0 fnt-caption">{userName}</p>
    </div>
  );
}
