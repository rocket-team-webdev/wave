/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Layout from "../../../components/Layout";
import FormWrapper from "../../../components/FormWrapper";
import Button from "../../../components/Button";
import ResetPasswordSchema from "./reset-password-schema";

import { PUBLIC } from "../../../constants/routes";
import useQuery from "../../../hooks/useQuery";
import { handleVerifyEmail } from "../../../services/auth/auth";
import Input from "../../../components/Input";

function Reauthenticate() {
  const query = useQuery();
  const [verifyError, setVerifyError] = useState(false);

  const mode = query.get("mode");

  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (resetPasswordState) => {
      try {
        const { newPassword } = resetPasswordState;
        console.log(newPassword);
      } catch (error) {
        toast(error.message, { type: "error" });
      }
    },
  });

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
          {mode === "verifyEmail" && (
            <FormWrapper formTitle="Email verification">
              {!verifyError ? (
                <p className="mt-2 fnt-song-bold fnt-secondary">
                  Your email account has been successfully verified! Now you can
                  log in. Click on the button below to be redirected to the
                  Log-in page.
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
          )}
          {mode === "resetPassword" && (
            <FormWrapper formTitle="Reset your password">
              {!verifyError ? (
                <>
                  <form onSubmit={formik.handleSubmit}>
                    <p className="mt-2 fnt-song-bold fnt-secondary mb-4">
                      Create a new password for your account
                    </p>
                    <Input
                      label="new password"
                      id="newPassword"
                      type="password"
                      placeholder="Create new password"
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                      errorMessage={formik.errors.newPassword}
                      hasErrorMessage={formik.touched.newPassword}
                    />
                  </form>
                  <div className="row">
                    <div className="mt-2 col-auto ms-auto">
                      <Button submitButton>Log in</Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="mt-2 fnt-song-bold fnt-danger">
                    Something went wrong
                  </p>
                  <div className="row">
                    <div className="mt-5 col-auto ms-auto">
                      <Link to={PUBLIC.SIGN_IN}>
                        <Button>Log in</Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </FormWrapper>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Reauthenticate;
