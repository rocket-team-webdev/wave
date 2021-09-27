import React from "react";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";

export default function Home() {
  return (
    <Layout>
      <div className="d-flex justify-content-between row p-0 g-4">
        <JumboText secText="Username" isNegative />
        <div className="col col-12 col-md-5 clr-light-20 fx-rounded fnt-subtitle-light p-0">
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
