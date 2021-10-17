import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userPassword: "",
    },
    validationSchema: ReauthenticateSchema,
    onSubmit: async (updatePasswordState) => {
      try {
        setLoading(true);
        const { userPassword } = updatePasswordState;
        await reauthenticateUserWithCredential(userPassword);
        await deleteAccount();
        await deleteCurrentUserAccount();

        await signOut();
        dispatch(logOut());

        history.push(PUBLIC.SIGN_IN);
        toast("Account deleted successfully!", { type: "success" });
      } catch (error) {
        toast(error.message, { type: "error" });
      }
      setLoading(false);
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
            <form onSubmit={formik.handleSubmit}>
              <Input
                label="user password"
                id="userPassword"
                type="password"
                placeholder="User password"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.userPassword}
                errorMessage={formik.errors.userPassword}
                hasErrorMessage={formik.touched.userPassword}
                disabled={loading}
              />
              <div className="row">
                <div className="mt-5 col-auto ms-auto">
                  <Button type="submit" isDanger submitButton>
                    Delete account
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

export default Reauthenticate;
