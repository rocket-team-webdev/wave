import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

import Header from "../Header";
import Footer from "../Footer";

import "./Layout.scss";

function Layout({ children, isNegative = false, thumbnailUrl }) {
  let mainClassNames = "flex-grow-1 px-3 pt-4 px-sm-5 pt-5 ";

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
    mainClassNames += " ";
  }

  return (
    <Scrollbars
      autoHide
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            zIndex: 1000,
            position: "absolute",
            width: "6px",
            transition: "opacity 200ms ease 0s",
            opacity: 0,
            right: "2px",
            bottom: "2px",
            top: "2px",
            borderRadius: "3px",
          }}
        />
      )}
    >
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
    </Scrollbars>
  );
}

export default Layout;
