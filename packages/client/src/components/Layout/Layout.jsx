import React from "react";

import Header from "../Header";
import Footer from "../Footer";

import "./Layout.scss";

function Layout({ children, isNegative = false, thumbnailUrl }) {
  let mainClassNames = "flex-grow-1 px-3 pt-4 pb-5 p-sm-5 ";

  // Thumbnail background settings
  let backgroundStyles = {};
  if (thumbnailUrl) {
    mainClassNames += "main-with-thumbnail ";
    backgroundStyles = {
      background: `url(${thumbnailUrl})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }

  if (isNegative) {
    mainClassNames += "clr-primary ";
  }

  return (
    <>
      {thumbnailUrl ? (
        <div className="d-flex flex-column layout-wrapper" data-testid="layout">
          <Header />
          <main className={mainClassNames}>
            <div className="thumbnail-background" style={backgroundStyles} />
            <div className="thumbnail-childrens">{children}</div>
          </main>
          <Footer />
        </div>
      ) : (
        <div className="d-flex flex-column layout-wrapper">
          <Header />
          <main className={mainClassNames}>{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Layout;
