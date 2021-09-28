import React from "react";
import { Link } from "react-router-dom";

import "./HomeElement.scss";

export default function HomeElement({ label, children, link = false }) {
  return (
    <div className="container-fluid p-0 mb-5">
      <div className="d-flex justify-content-between align-items-center">
        <p className="fnt-label-bold mb-2">{label.toUpperCase()}</p>
        <Link to={link} className="mb-2 fnt-smallest">
          See all {label.toLowerCase()}
          <i className="ms-2 fas fa-arrow-circle-right" />
        </Link>
      </div>
      <div className="content d-flex flex-wrap">{children}</div>
    </div>
  );
}
