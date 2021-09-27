import React from "react";

export default function HomeElement({ label, children }) {
  return (
    <div className="container-fluid p-0 mb-3">
      <p className="fnt-subtitle-light mb-2">{label}</p>
      <div className="content d-flex flex-wrap">{children}</div>
    </div>
  );
}
