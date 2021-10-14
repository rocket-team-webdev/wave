import React from "react";
import { useSelector /* useDispatch */ } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { PUBLIC } from "../../constants/routes";
// import { logOut } from "../../redux/user/actions";
// import { signOut } from "../../services/auth";

import waveappLogo from "../../assets/images/waveapp-logotype.svg";

// import Button from "../Button";

import "./Header.scss";
// import { clearQueue } from "../../redux/music-queue/actions";

function Header({ props }) {
  // const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const navlinkClasses = "fnt-caption d-flex align-items-center fnt-white";

  // const handleSignOut = async () => {
  //   await signOut();
  //   dispatch(logOut());
  //   dispatch(clearQueue());
  // };
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
        <div className="col-5 d-flex justify-content-end align-items-center p-0">
          <div className="d-flex justify-content-between">
            {/* {userState.isLogged && (
              <div className="">
                <Link to={PUBLIC.SIGN_IN}>
                  <Button isSmall handleClick={handleSignOut}>
                    Sign out
                  </Button>
                </Link>
              </div>
            )} */}
            <div className="main-navigation d-flex">
              <NavLink className={navlinkClasses} to={PUBLIC.MY_SONGS}>
                My songs
              </NavLink>
              <NavLink className={navlinkClasses} to={PUBLIC.MY_PLAYLISTS}>
                My playlists
              </NavLink>
              <NavLink className={navlinkClasses} to="/">
                My albums
              </NavLink>
            </div>
            <NavLink
              to={`${PUBLIC.USER_VIEW}/${userState.mongoId}`}
              className={navlinkClasses}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
