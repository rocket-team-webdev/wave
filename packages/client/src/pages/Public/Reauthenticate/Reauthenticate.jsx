import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import ReauthenticateSchema from "./reauthenticate-schema";

import Layout from "../../../components/Layout";
import FormWrapper from "../../../components/FormWrapper";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import {
  reauthenticateUserWithCredential,
  deleteCurrentUserAccount,
  signOut,
} from "../../../services/auth/auth";
import { logOut } from "../../../redux/user/actions";
import { deleteAccount } from "../../../api/account-api";
import { PUBLIC } from "../../../constants/routes";

function Reauthenticate() {
  const history = useHistory();
  const dispatch = useDispatch();

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

        await signOut();
        dispatch(logOut());

        history.push(PUBLIC.SIGN_IN);
      } catch (error) {
        toast(error.message, { type: "error" });
      }
    },
  });

  useEffect(() => {
    if (history.location.state?.referrer !== PUBLIC.USER_ACCOUNT)
      history.push(PUBLIC.HOME);
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col col-6 m-auto">
          <FormWrapper formTitle="Enter your credentials">
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
                <Button type="submit" isDanger>
                  Delete account
                </Button>
              </div>
            </div>
          </FormWrapper>
        </div>
      </div>
    </Layout>
  );
}

export default Reauthenticate;
