import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PUBLIC } from "../../constants/routes";
import { logOut } from "../../redux/user/actions";
import { signOut } from "../../services/auth";

import Button from "../Button";

import "./Header.scss";

function Header({ props }) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const handleSignOut = async () => {
    await signOut();
    dispatch(logOut());
  };
  return (
    <header {...props}>
      <div className="row">
        <div className="col">
          <Link to={PUBLIC.HOME}> Logo</Link>
        </div>
        <div className="col-2 text-end">
          <Link to={PUBLIC.USER_ACCOUNT}>
            <p className="fnt-caption">{userState.firstName}</p>
          </Link>
        </div>
        <div className="col-1 text-center">
          <p className="fnt-caption">Sign Up</p>
        </div>
        <div className="col-1">
          <Link to={PUBLIC.SIGN_IN}>
            <Button isSmall>Log In</Button>
          </Link>
        </div>
        <div className="col-1">
          <Button isSmall handleClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
