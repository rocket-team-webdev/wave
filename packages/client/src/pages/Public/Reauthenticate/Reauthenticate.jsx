/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ReauthenticateSchema from "./reauthenticate-schema";

import Layout from "../../../components/Layout";
import FormWrapper from "../../../components/FormWrapper";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import {
  reauthenticateUserWithCredential,
  deleteCurrentUserAccount,
  reauthenticateUserWithGoogle,
  signOut,
} from "../../../services/auth/auth";
import { logOut } from "../../../redux/user/actions";
import { deleteAccount } from "../../../api/account-api";
import { PUBLIC } from "../../../constants/routes";
import Spinner from "../../../components/Spinner";

function Reauthenticate() {
  const userState = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteAccount = async (userPassword) => {
    try {
      setLoading(true);
      if (userState.googleProvider) await reauthenticateUserWithGoogle();
      else await reauthenticateUserWithCredential(userPassword);

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
  };

  const formik = useFormik({
    initialValues: {
      userPassword: "",
    },
    validationSchema: ReauthenticateSchema,
    onSubmit: async (updatePasswordState) => {
      try {
        const { userPassword } = updatePasswordState;
        handleDeleteAccount(userPassword);
      } catch (error) {
        toast(error.message, { type: "error" });
      }
    },
  });

  useEffect(() => {
    if (history.location.state?.referrer !== PUBLIC.USER_ACCOUNT)
      history.push(PUBLIC.HOME);
  }, []);

  const title = `${
    userState.googleProvider ? "Delete your Account" : "Enter your credentials"
  }`;

  return (
    <Layout>
      <div className="row">
        <div className="col col-6 m-auto">
          {/* <FormWrapper formTitle="Enter your credentials" `${userState.googleProvider}`> */}

          <FormWrapper formTitle={title}>
            <form onSubmit={formik.handleSubmit}>
              {loading ? (
                <div className="col col-12 col-md-6">
                  <Spinner />
                </div>
              ) : !userState.googleProvider ? (
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
              ) : (
                <p className="mt-5 fnt-song-bold text-danger">
                  This action cannot be undone, are you sure you want to delete
                  this account?
                </p>
              )}
              <div className="row">
                <div className="mt-5 col-auto ms-auto">
                  {!userState.googleProvider && (
                    <Button isDanger submitButton disabled={loading}>
                      Delete account
                    </Button>
                  )}
                  {userState.googleProvider && (
                    <Button
                      isDanger
                      onClick={handleDeleteAccount}
                      disabled={loading}
                    >
                      Delete account
                    </Button>
                  )}
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
