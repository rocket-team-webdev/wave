/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../../components/Layout";
import FormWrapper from "../../../components/FormWrapper";
import Button from "../../../components/Button";

import { PUBLIC } from "../../../constants/routes";
import useQuery from "../../../hooks/useQuery";
import { handleVerifyEmail } from "../../../services/auth/auth";

function Reauthenticate() {
  const query = useQuery();
  const [verifyError, setVerifyError] = useState(false);

  useEffect(async () => {
    try {
      setVerifyError(false);
      await handleVerifyEmail(query.get("oobCode"));
    } catch (error) {
      setVerifyError(true);
      toast(error.message, { type: "error" });
    }
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col col-6 m-auto">
          <FormWrapper formTitle="Email verification">
            {!verifyError ? (
              <p className="mt-2 fnt-song-bold fnt-secondary">
                Your email account has been successfully verified! Now you can
                log in. Click on the button below to be redirected to the Log-in
                page.
              </p>
            ) : (
              <p className="mt-2 fnt-song-bold fnt-danger">
                Something went wrong
              </p>
            )}
            <div className="row">
              <div className="mt-5 col-auto ms-auto">
                <Link to={PUBLIC.SIGN_IN}>
                  <Button>Log in</Button>
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
