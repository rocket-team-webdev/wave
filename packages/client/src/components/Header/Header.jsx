import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PUBLIC } from "../../constants/routes";
import { logOut } from "../../redux/user/actions";
import { signOut } from "../../services/auth";

import waveappLogo from "../../assets/images/waveapp-logotype.svg";

import Button from "../Button";

import "./Header.scss";
import { clearQueue } from "../../redux/music-queue/actions";

function Header({ props }) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const handleSignOut = async () => {
    await signOut();
    dispatch(logOut());
    dispatch(clearQueue());
  };
  return (
    <header
      {...props}
      className="container-fluid px-5 h-85 d-flex align-items-center clr-primary"
    >
      <div className="row m-0 w-100 d-flex align-items-center">
        <div className="col-9 p-0">
          <div className="logo-container">
            <Link to={PUBLIC.HOME}>
              <img src={waveappLogo} alt="Wave App Logo" />
            </Link>
          </div>
        </div>
        <div className="col-3 d-flex justify-content-end align-items-center p-0">
          <div className="me-4">
            <Link
              to={PUBLIC.USER_ACCOUNT}
              className="fnt-caption d-flex align-items-center fnt-white"
            >
              {userState.isLogged && (
                <div>
                  <img
                    className="profile-picture fx-rounded me-3"
                    src={userState.profilePicture}
                    alt="profilePicture"
                  />
                </div>
              )}
              <div>{userState.firstName}</div>
            </Link>
          </div>
          {userState.isLogged && (
            <div className="">
              <Link to={PUBLIC.SIGN_IN}>
                <Button isSmall handleClick={handleSignOut}>
                  Sign out
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
