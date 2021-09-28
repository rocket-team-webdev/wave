import React from "react";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";

// import MusicPlayer from "../../../components/MusicPlayer";

export default function Home() {
  return (
    <Layout isNegative>
      {/* <div className="d-flex flex-row justify-content-between row p-0 g-4"> */}
      <div className="row">
        <JumboText secText="Username" isNegative cols="7" />
        <div className="col-5 col-12 col-md-5 clr-light-20 fx-rounded fnt-subtitle-light p-0">
          Right element
          <br />
          Right element
          <br />
          Right element
          <br />
          Right element
          <br />
          Right element
          <br />
          Right element
          <br />
          Right element
          <br />
          Right element
          <br />
          Right element
          <br />
          Right element
          <br />
          Right element
          <br />
          Right element
          <br />
        </div>
      </div>
    </Layout>
  );
}
