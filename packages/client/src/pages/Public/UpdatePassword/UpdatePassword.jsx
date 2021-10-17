import React from "react";
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
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (updatePasswordState) => {
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
    },
  });

  return (
    <Layout>
      <div className="row p-0 m-0 col col-12 pb-5 pb-sm-0">
        <div className="col col-12 col-lg-6 pt-2">
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
                onChange={formik.handleChange}
                value={formik.values.currentPassword}
                errorMessage={formik.errors.currentPassword}
                hasErrorMessage={formik.touched.currentPassword}
              />
              <Input
                label="new password"
                id="newPassword"
                type="password"
                placeholder="New password"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                errorMessage={formik.errors.newPassword}
                hasErrorMessage={formik.touched.newPassword}
              />
              <Input
                label="confirm password"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                errorMessage={formik.errors.confirmPassword}
                hasErrorMessage={formik.touched.confirmPassword}
              />
              <div className="row pe-0">
                <div className="mt-5 col-auto ms-auto pe-0">
                  <Button type="submit">Change Password</Button>
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
