import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function AccountSideBar() {
  const userState = useSelector((state) => state.user);

  return (
    <div className="row m-0 p-0">
      <div className="col col-12 col-sm-6 col-lg-12 p-0">
        <h1 className="fnt-jumbo mt-0 pt-0 fnt-primary fnt-uppercase truncate">
          {userState.firstName}
        </h1>
      </div>
      <div className="col col-12 col-sm-6 col-lg-12 p-0">
        <div>
          <NavLink
            exact
            to="/account"
            className="fnt-subtitle-light col-12"
            activeClassName="fnt-subtitle-bold"
          >
            ACCOUNT DETAILS
          </NavLink>
        </div>
        {!userState.googleProvider && (
          <div>
            <NavLink
              exact
              to="/account/settings/update-password"
              className="fnt-subtitle-light col-12"
              activeClassName="fnt-subtitle-bold"
            >
              PASSWORD UPDATE
            </NavLink>
          </div>
        )}
        <div>
          <NavLink
            exact
            to="/stats"
            className="fnt-subtitle-light col-12"
            activeClassName="fnt-subtitle-bold"
          >
            APP STATS
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default AccountSideBar;
