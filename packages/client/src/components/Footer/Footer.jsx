import React from "react";

import "./Footer.scss";

const Footer = ({ darkBackground, ...props }) => {
  const footerClasses = "px-3 px-sm-5 h-60 d-flex align-items-center";
  return (
    <footer
      className={
        darkBackground
          ? `${footerClasses} fx-dark-footer`
          : `${footerClasses} fx-blur`
      }
      {...props}
    >
      <div className="row m-0 w-100 d-flex align-items-center">
        <div className="col p-0">
          <p className="fnt-caption m-0 fnt-white">WebApp &copy; 2021</p>
        </div>
        <div className="col p-0">
          <p className="fnt-caption text-end m-0 fnt-white">
            Developed with love by Team Rocket
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
