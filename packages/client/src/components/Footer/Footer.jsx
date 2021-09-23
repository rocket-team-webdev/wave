import React from "react";

import "./Footer.scss";

const Footer = ({ ...props }) => {
  return (
    <footer className="" {...props}>
      <p className="fnt-caption">WebApp &copy; 2021</p>
    </footer>
  );
};

export default Footer;
