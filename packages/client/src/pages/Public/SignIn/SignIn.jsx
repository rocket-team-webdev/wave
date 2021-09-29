import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { trigger } from "../../../utils/customEvents";

import signInSchema from "./sign-in-schema";
import { createClient, signInUserData } from "../../../api/account-api";
import {
  signInWithGoogle,
  signIn,
  signOut,
  setCredentialsPersistance,
} from "../../../services/auth";

import JumboText from "../../../components/JumboText";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import Checkbox from "../../../components/Checkbox";
import { isRegistering } from "../../../redux/user/actions";

import { PUBLIC } from "../../../constants/routes";
import FormWrapper from "../../../components/FormWrapper";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [saveCredentials, setSaveCredentials] = useState(false);
  const dispatch = useDispatch();
  const credentialsCheckbox = useRef();

  const handleSaveCredentials = () => {
    if (credentialsCheckbox.current.checked) {
      setSaveCredentials(true);
    } else {
      setSaveCredentials(false);
    }
    setCredentialsPersistance(credentialsCheckbox);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (signInState) => {
      setLoading(true);

      // Set save credentials
      handleSaveCredentials();
      try {
        const signInResponse = await signIn(
          signInState.email,
          signInState.password,
        );
        const token = signInResponse.user.multiFactor.user.accessToken;
        await signInUserData(token);

        if (!signInResponse.user.multiFactor.user.emailVerified) {
          signOut();
          toast("Please verify your email!", { type: "error" });
        }
      } catch (error) {
        setLoading(false);
        toast(error.message, { type: "error" });
      }
    },
  });

  const handleGoogleSignIn = async () => {
    dispatch(isRegistering(true));

    try {
      const googleResult = await signInWithGoogle();
      const {
        family_name: familyName,
        given_name: givenName,
        picture,
      } = googleResult.additionalUserInfo.profile;

      const loggedUserObject = {
        firstName: givenName,
        lastName: familyName,
        profilePicture: picture,
      };

      await createClient(loggedUserObject);
      dispatch(isRegistering(false));
      trigger("setLoginReduxState");
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  return (
    <Layout>
      <div className="row">
        <JumboText secText="Sign In." />
        <div className="col-6">
          <FormWrapper formTitle="Log in">
            <form onSubmit={formik.handleSubmit} className="row">
              <Input
                label="email"
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                errorMessage={formik.errors.email}
                hasErrorMessage={formik.touched.email}
                classNames="mb-1"
              />
              <Input
                label="password"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                errorMessage={formik.errors.password}
                hasErrorMessage={formik.touched.password}
                classNames="mb-4"
              />
              <div className="form-footer-wrapper">
                <div className="fnt-caption">
                  Forgot your password? Reset it
                  <Link to={PUBLIC.RESET_PASSWORD}>here.</Link>
                </div>
                <div className="fnt-caption mt-4 row">
                  <Checkbox
                    label="Remember account"
                    id="testCheckbox"
                    ref={credentialsCheckbox}
                    checked={saveCredentials}
                    onChange={handleSaveCredentials}
                  />
                  <div className="d-flex justify-content-end col col-12 col-md-7 p-0">
                    <div className="d-inline-flex p-2 pe-2">
                      <Button handleClick={handleGoogleSignIn}>
                        <i className="fab fa-google" />
                      </Button>
                    </div>
                    <div className="p-2">
                      <Button submitButton>Log in</Button>
                    </div>
                  </div>
                </div>
                <div className="fnt-caption">
                  First time in WaveApp?
                  <br />
                  Please, <Link to={PUBLIC.SIGN_UP}>sign up.</Link>
                </div>
              </div>
            </form>
            {loading && <h3>Loading...</h3>}
          </FormWrapper>
        </div>
      </div>
    </Layout>
  );
}
