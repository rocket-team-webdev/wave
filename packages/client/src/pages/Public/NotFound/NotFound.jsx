import React from "react";
import JumboText from "../../../components/JumboText";
import Layout from "../../../components/Layout";

export default function NotFound() {
  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        <div className="col col-12 mt-4">
          <div className="d-flex justify-content-between align-items-start">
            <JumboText
              priText="Oops, this page doesn't exist!"
              cols="11"
              isNegative
            />
          </div>
          <h3 className="fnt-subtitle-light mt-4">Error 404</h3>
        </div>
      </div>
    </Layout>
  );
}
