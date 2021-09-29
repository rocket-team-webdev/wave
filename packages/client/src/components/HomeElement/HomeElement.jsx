import React from "react";
import { Link } from "react-router-dom";

import "./HomeElement.scss";

export default function HomeElement({
  label,
  link = "/",
  cols = "12",
  children,
}) {
  return (
    <div
      className={`container-fluid p-0 mx-0 pe-5 pb-5 col col-12 col-md-${cols}`}
    >
      <div className="d-flex justify-content-between align-items-center">
        <p className="fnt-label-bold mb-2 truncate home-element-title">
          {label.toUpperCase()}
        </p>
        <Link to={link} className="mb-2 fnt-smallest">
          See all
          <i className="ms-2 fas fa-arrow-circle-right" />
        </Link>
      </div>
      <div className="content d-flex flex-wrap">{children}</div>
    </div>
  );
}
