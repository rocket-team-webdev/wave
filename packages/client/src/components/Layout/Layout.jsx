import React from "react";

import Header from "../Header";
import Footer from "../Footer";

import "./Layout.scss";

function Layout({ children }) {
  return (
    <div className="d-flex flex-column layout-wrapper">
      <Header />
      <main className="clr-primary flex-grow-1 p-5">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
