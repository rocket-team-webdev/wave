import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { PUBLIC } from "../../constants/routes";
import { logOut } from "../../redux/user/actions";
import { signOut } from "../../services/auth";

import waveappLogo from "../../assets/images/waveapp-logotype.svg";

// import Button from "../Button";

import "./Header.scss";
import { clearQueue } from "../../redux/music-queue/actions";

function Header({ props }) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const history = useHistory();

  const navlinkClasses =
    "fnt-caption d-flex justify-content-center align-items-center fnt-white nav-link";

  const handleSignOut = async () => {
    await signOut();
    dispatch(logOut());
    dispatch(clearQueue());
    history.push(PUBLIC.SIGN_IN);
  };

  return (
    <header
      {...props}
      className="container-fluid px-5 h-85 d-flex align-items-center clr-primary"
    >
      <div className="row m-0 w-100 d-flex align-items-center">
        <div className="col-7 p-0">
          <div className="logo-container">
            <Link to={PUBLIC.HOME}>
              <img src={waveappLogo} alt="Wave App Logo" />
            </Link>
          </div>
        </div>
        {userState.isLogged && (
          <div className="col-5 d-flex justify-content-end align-items-center p-0">
            <div className="d-flex justify-content-between">
              <div className="main-navigation d-none d-md-flex">
                <NavLink
                  className={navlinkClasses}
                  activeClassName="active-navlink"
                  to={PUBLIC.MY_SONGS}
                >
                  My songs
                </NavLink>
                <NavLink
                  className={navlinkClasses}
                  activeClassName="active-navlink"
                  to={PUBLIC.MY_PLAYLISTS}
                >
                  My playlists
                </NavLink>
                <NavLink
                  className={navlinkClasses}
                  activeClassName="active-navlink"
                  to="/"
                >
                  My albums
                </NavLink>
              </div>
              <NavLink
                to={`${PUBLIC.USER_VIEW}/${userState.mongoId}`}
                className="fnt-caption d-flex justify-content-center align-items-center fnt-white user-link truncate"
              >
                <div>{userState.firstName}</div>
              </NavLink>

              {userState.isLogged && (
                <div>
                  <button
                    type="button"
                    id="contextUserMenu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      className="profile-picture fx-rounded"
                      src={userState.profilePicture}
                      alt="profilePicture"
                    />
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end clr-secondary p-1"
                    aria-labelledby="contextUserMenu"
                  >
                    <li>
                      <button
                        className="dropdown-item fnt-light fnt-song-regular "
                        type="button"
                        onClick={() => {}}
                      >
                        User account
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item fnt-light fnt-song-regular "
                        type="button"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
