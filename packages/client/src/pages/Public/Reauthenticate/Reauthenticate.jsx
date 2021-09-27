import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import ReauthenticateSchema from "./reauthenticate-schema";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import {
  reauthenticateUserWithCredential,
  deleteCurrentUserAccount,
} from "../../../services/auth/auth";
import { deleteAccount } from "../../../api/account-api";
import { PUBLIC } from "../../../constants/routes";

function Reauthenticate() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      userPassword: "",
    },
    validationSchema: ReauthenticateSchema,
    onSubmit: async (updatePasswordState) => {
      const { userPassword } = updatePasswordState;
      try {
        await reauthenticateUserWithCredential(userPassword);
        await deleteAccount();
        await deleteCurrentUserAccount();

        history.push(PUBLIC.HOME);
      } catch (error) {
        toast(error.message, { type: "error" });
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
