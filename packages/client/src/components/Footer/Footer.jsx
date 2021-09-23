import React from "react";

import "./Footer.scss";

const Footer = ({ ...props }) => {
  return (
    <footer className="" {...props}>
      <div className="row">
        <div className="col">
          <p className="fnt-caption">WebApp &copy; 2021</p>
        </div>
        <div className="col text-end">
          <p className="fnt-caption text-end">
            Developed with love by Team Rocket
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
