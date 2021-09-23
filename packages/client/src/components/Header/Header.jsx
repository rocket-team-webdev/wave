import React from "react";
import Button from "../Button";

import "./Header.scss";

function Header({ props }) {
  return (
    <header {...props}>
      <div className="row">
        <div className="col">Logo</div>
        <div className="col-2 text-end">
          <p className="fnt-caption">User account</p>
        </div>
        <div className="col-1 text-center">
          <p className="fnt-caption">Sign Up</p>
        </div>
        <div className="col-1">
          <Button isSmall>Log In</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
