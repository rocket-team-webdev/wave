import React from "react";
import { Link } from "react-router-dom";

function AccountSideBar() {
  return (
    <div>
      <h1 className="fnt-jumbo mt-0 pt-0 fnt-primary">USERNAME</h1>
      <Link to="/account">
        <p className="fnt-subtitle-bold mb-0 lh-1">ACCOUNT DETAILS</p>
      </Link>
      <Link to="/account/settings/update-password">
        <p className="fnt-subtitle-light mb-0 lh-1">PASSWORD UPDATE</p>
      </Link>
      {/* <p className="fnt-subtitle-light mb-0 lh-1">LOGOUT</p> */}
    </div>
  );
}

export default AccountSideBar;
