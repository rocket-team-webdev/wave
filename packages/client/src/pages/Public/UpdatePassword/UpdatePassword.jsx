import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import updatePasswordSchema from "./update-password-schema";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import {
  updateUserPassword,
  reauthenticateUserWithCredential,
} from "../../../services/auth/auth";
import { PUBLIC } from "../../../constants/routes";
import AccountSideBar from "../../../components/AccountSideBar";
import Layout from "../../../components/Layout";
import FormWrapper from "../../../components/FormWrapper";

function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const userState = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (userState.googleProvider) history.goBack();
  }, []);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (updatePasswordState) => {
      setLoading(true);
      const currentPassword = updatePasswordState.currentPassword;
      const newPassword = updatePasswordState.newPassword;
      try {
        await reauthenticateUserWithCredential(currentPassword);
        await updateUserPassword(newPassword);
        toast("Password updated successfully, redirecting to account page...", {
          type: "success",
        });

        setTimeout(() => {
          history.push(PUBLIC.USER_ACCOUNT);
        }, 2000);
      } catch (error) {
        toast(error.message, {
          type: "error",
        });
      }
      setLoading(false);
    },
  });

  return (
    <Layout>
      <div className="row p-0 m-0 col col-12 pb-5 pb-sm-0">
        <div className="col col-12 col-lg-6">
          <AccountSideBar />
        </div>
        <div className="col col-12 col-lg-6 pt-2">
          <FormWrapper formTitle="Change your password">
            <form onSubmit={formik.handleSubmit} className="row">
              <Input
                label="current password"
                id="currentPassword"
                type="password"
                placeholder="Current password"
                value={formik.values.currentPassword}
                errorMessage={formik.errors.currentPassword}
                hasErrorMessage={formik.touched.currentPassword}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                disabled={loading}
              />
              <Input
                label="new password"
                id="newPassword"
                type="password"
                placeholder="New password"
                handleChange={formik.handleChange}
                value={formik.values.newPassword}
                errorMessage={formik.errors.newPassword}
                hasErrorMessage={formik.touched.newPassword}
                handleBlur={formik.handleBlur}
                disabled={loading}
              />
              <Input
                label="confirm password"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                handleChange={formik.handleChange}
                value={formik.values.confirmPassword}
                errorMessage={formik.errors.confirmPassword}
                hasErrorMessage={formik.touched.confirmPassword}
                handleBlur={formik.handleBlur}
                disabled={loading}
              />
              <div className="row pe-0">
                <div className="mt-5 col-auto ms-auto pe-0">
                  <Button type="submit" disabled={loading}>
                    Change Password
                  </Button>
                </div>
              </div>
            </form>
          </FormWrapper>
        </div>
      </div>
    </Layout>
  );
}

export default UpdatePassword;
