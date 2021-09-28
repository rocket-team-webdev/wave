import React from "react";

import "./HomeElement.scss";

export default function HomeElement({ label, children }) {
  return (
    <div className="container-fluid p-0 mb-5">
      <p className="fnt-label-bold mb-2">{label.toUpperCase()}</p>
      <div className="content d-flex flex-wrap">{children}</div>
    </div>
  );
}
