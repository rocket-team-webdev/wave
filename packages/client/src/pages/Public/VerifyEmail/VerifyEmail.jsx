/* eslint-disable no-nested-ternary */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "../../../components/Layout";
import FormWrapper from "../../../components/FormWrapper";
import Button from "../../../components/Button";

import { PUBLIC } from "../../../constants/routes";

function Reauthenticate() {
  const history = useHistory();

  console.log(PUBLIC.HOME);
  console.log(history);

  return (
    <Layout>
      <div className="row">
        <div className="col col-6 m-auto">
          <FormWrapper formTitle="Email verification">
            <p className="mt-5 fnt-song-bold text-danger">
              Your email account has been successfully verified. Now you can log
              in. Click on the button and you will be redirected to the Log-in
              page.
            </p>
            <div className="row">
              <div className="mt-5 col-auto ms-auto">
                <Link to={PUBLIC.HOME}>
                  <Button>Go Home</Button>
                </Link>
              </div>
            </div>
          </FormWrapper>
        </div>
      </div>
    </Layout>
  );
}

export default Reauthenticate;
