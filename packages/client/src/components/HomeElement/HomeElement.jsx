import React from "react";

import "./HomeElement.scss";

export default function HomeElement({ label, children }) {
  return (
    <div className="container-fluid p-0 mb-4">
      <p className="fnt-subtitle-light mb-2">{label}</p>
      <div className="content d-flex flex-wrap">{children}</div>
    </div>
  );
}
