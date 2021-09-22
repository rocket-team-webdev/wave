import React from "react";
import { useFormik } from "formik";
import updatePasswordSchema from "./update-password-schema";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { getCurrentUserToken } from "../../../services/auth";

function UpdatePassword() {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (updatePasswordState) => {
      const token = await getCurrentUserToken();
      console.log(token);
      console.log(updatePasswordState);
    },
  });
  return (
    <>
      <div className="row">
        <div className="col col-6 p-5">
          <h1>Username</h1>
        </div>
        <div className="col col-6 p-5">
          <form
            onSubmit={formik.handleSubmit}
            className="clr-light fx-rounded p-5 "
          >
            <h1 className="fnt-label-bold mb-5">Change your password</h1>
            <Input
              label="current password"
              id="currentPassword"
              name="currentPassword"
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
              name="newPassword"
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
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              errorMessage={formik.errors.confirmPassword}
              hasErrorMessage={formik.touched.confirmPassword}
            />
            <div className="row">
              <div className="mt-5 col-auto ms-auto">
                <Button type="submit">Change Password</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdatePassword;
