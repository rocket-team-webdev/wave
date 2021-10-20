import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { PUBLIC } from "../../constants/routes";
import { logOut } from "../../redux/user/actions";
import { signOut } from "../../services/auth";

import waveappLogo from "../../assets/images/waveapp-logotype.svg";

// import Button from "../Button";

import "./Header.scss";
import { clearQueue } from "../../redux/music-queue/actions";

function Header({ props }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const history = useHistory();

  const navlinkClasses =
    "fnt-caption d-flex justify-content-center align-items-center fnt-secondary nav-link";

  const handleSignOut = async () => {
    dispatch(logOut());
    dispatch(clearQueue());
    await signOut();
    history.push(PUBLIC.SIGN_IN);
  };

  return (
    <header
      {...props}
      className="container-fluid px-3 px-sm-5 h-85 d-flex align-items-center fx-blur"
    >
      <div className="row m-0 w-100 d-flex align-items-center">
        <div className="col-7 p-0">
          <div className="logo-container">
            <Link
              to={{
                pathname: `${PUBLIC.HOME}`,
                state: {
                  referrer: location.pathname,
                },
              }}
            >
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
                  to={{
                    pathname: `${PUBLIC.MY_SONGS}`,
                    state: {
                      referrer: location.pathname,
                    },
                  }}
                >
                  My songs
                </NavLink>
                <NavLink
                  className={navlinkClasses}
                  activeClassName="active-navlink"
                  to={{
                    pathname: `${PUBLIC.MY_PLAYLISTS}`,
                    state: {
                      referrer: location.pathname,
                    },
                  }}
                >
                  My playlists
                </NavLink>
                <NavLink
                  className={navlinkClasses}
                  activeClassName="active-navlink"
                  to={{
                    pathname: `${PUBLIC.ALBUMS}`,
                    state: {
                      referrer: location.pathname,
                    },
                  }}
                >
                  My albums
                </NavLink>
              </div>
              <NavLink
                to={{
                  pathname: `${PUBLIC.USER_VIEW}/${userState.mongoId}`,
                  state: {
                    referrer: location.pathname,
                  },
                }}
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
                      className="profile-picture"
                      src={userState.profilePicture}
                      alt="profilePicture"
                    />
                  </button>
                  {/* Contextual menu */}
                  <ul
                    className="dropdown-menu dropdown-menu-end clr-secondary p-1"
                    aria-labelledby="contextUserMenu"
                  >
                    {/* Displaying in small sizes */}
                    <li className="d-md-none fnt-light">
                      <Link
                        to={{
                          pathname: `${PUBLIC.MY_SONGS}`,
                          state: {
                            referrer: location.pathname,
                          },
                        }}
                        className="dropdown-item fnt-link-regular"
                        onClick={() => {}}
                      >
                        My songs
                      </Link>
                    </li>
                    <li className="d-md-none fnt-light">
                      <Link
                        to={{
                          pathname: `${PUBLIC.MY_PLAYLISTS}`,
                          state: {
                            referrer: location.pathname,
                          },
                        }}
                        className="dropdown-item fnt-link-regular"
                        onClick={() => {}}
                      >
                        My playlists
                      </Link>
                    </li>
                    <li className="d-md-none fnt-light">
                      <Link
                        to={{
                          pathname: `/`,
                          state: {
                            referrer: location.pathname,
                          },
                        }}
                        className="dropdown-item fnt-link-regular"
                        onClick={() => {}}
                      >
                        My albums
                      </Link>
                    </li>
                    <hr className="d-md-none light-hr" />
                    {/* Displaying at all sizes */}
                    <li className="fnt-light">
                      <Link
                        to={{
                          pathname: `${PUBLIC.TRACK_UPLOAD}`,
                          state: {
                            referrer: location.pathname,
                          },
                        }}
                        className="dropdown-item fnt-link-regular"
                      >
                        Upload song
                      </Link>
                    </li>
                    <li className="fnt-light">
                      <Link
                        to={{
                          pathname: `${PUBLIC.ADD_PLAYLIST}`,
                          state: {
                            referrer: location.pathname,
                          },
                        }}
                        className="dropdown-item fnt-link-regular"
                        type="button"
                      >
                        Create playlist
                      </Link>
                    </li>
                    {/* <li className="fnt-light">
                      <Link
                        to={{
                          pathname: `${PUBLIC.ADD_ALBUM}`,
                          state: {
                            referrer: location.pathname,
                          },
                        }}
                        className="dropdown-item fnt-link-regular"
                        type="button"
                      >
                        Create album
                      </Link>
                    </li> */}
                    <hr className="light-hr" />

                    <li className="fnt-light">
                      <Link
                        to={{
                          pathname: `${PUBLIC.USER_ACCOUNT}`,
                          state: {
                            referrer: location.pathname,
                          },
                        }}
                        className="dropdown-item fnt-link-regular"
                        type="button"
                      >
                        Account details
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item fnt-light fnt-regular"
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
