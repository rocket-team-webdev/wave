import React from "react";
import { Link } from "react-router-dom";

import "./HomeElement.scss";

export default function HomeElement({
  label,
  link = false,
  cols = "12",
  children,
}) {
  return (
    <div className={`container-fluid p-0 mx-0 mb-5 col col-12 col-md-${cols}`}>
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
