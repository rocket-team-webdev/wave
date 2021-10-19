import React from "react";

import Header from "../Header";
import Footer from "../Footer";

import "./Layout.scss";

function Layout({ children, isNegative = false, thumbnailUrl, bgColor }) {
  let mainClassNames = "flex-grow-1 px-3 pt-4 px-sm-5 pt-5 ";

  // Thumbnail background settings
  let backgroundStyles = {};
  if (thumbnailUrl) {
    mainClassNames += "main-with-thumbnail ";
    backgroundStyles = {
      backgroundImage: `url(${thumbnailUrl})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundPositionX: "25%",
    };
    if (bgColor) backgroundStyles.backgroundColor = `${bgColor}`;
  }

  if (!isNegative && !thumbnailUrl) {
    mainClassNames += "clr-white ";
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
        <div
          className="d-flex flex-column layout-wrapper clr-primary"
          data-testid="layout"
        >
          <Header />
          <main className={mainClassNames}>{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Layout;
