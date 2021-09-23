import React from "react";
import { useFormik } from "formik";
import ReauthenticateSchema from "./reauthenticate-schema";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { reauthenticateUserWithCredential } from "../../../services/auth/auth";

function Reauthenticate() {
  const formik = useFormik({
    initialValues: {
      userPassword: "",
    },
    validationSchema: ReauthenticateSchema,
    onSubmit: async (updatePasswordState) => {
      console.log("PasswordState", updatePasswordState);
      const { userPassword } = updatePasswordState;
      try {
        await reauthenticateUserWithCredential(userPassword);
      } catch (error) {
        console.log("error PasswordState", error);
      }
    },
  });

  return (
    <div className="row">
      <div className="col col-6 m-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="clr-light fx-rounded p-5 "
        >
          <h1 className="fnt-subtitle-bold mb-4">Enter your credentials</h1>
          <Input
            label="user password"
            id="userPassword"
            type="password"
            placeholder="User password"
            onChange={formik.handleChange}
            value={formik.values.currentPassword}
            errorMessage={formik.errors.currentPassword}
            hasErrorMessage={formik.touched.currentPassword}
          />

          <div className="row">
            <div className="mt-5 col-auto ms-auto">
              <Button type="submit">Authenticate</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Reauthenticate;
