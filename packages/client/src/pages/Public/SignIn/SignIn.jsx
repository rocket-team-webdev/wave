import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import { useHistory, Link } from "react-router-dom";
import signInSchema from "./sign-in-schema";
import { createClient, signInUserData } from "../../../api/account-api";
import {
  signInWithGoogle,
  signIn,
  setCredentialsPersistance,
} from "../../../services/auth";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import Checkbox from "../../../components/Checkbox";

// import googleIcon from "../../../assets/images/google-icon.svg";

import { PUBLIC } from "../../../constants/routes";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [saveCredentials, setSaveCredentials] = useState(false);

  // Save credentials checkbox
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
      setLoggedIn(false);

      // Set save credentials
      handleSaveCredentials();
      try {
        const signInResponse = await signIn(
          signInState.email,
          signInState.password,
        );
        const token = signInResponse.user.multiFactor.user.accessToken;
        await signInUserData(token);
        setLoggedIn(true);
        setLoading(false);
        setTimeout(() => {
          history.push(PUBLIC.HOME);
        }, 500);
      } catch (error) {
        setLoginError(error.message);
        setLoading(false);
      }
    },
  });

  const handleGoogleSignIn = async () => {
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
      setLoggedIn(true);
      setTimeout(() => {
        history.push(PUBLIC.HOME);
      }, 500);
    } catch (error) {
      // setLoginError(error);
      setLoggedIn(true);
      console.clear();
      console.log("Failed Google sign in.");
    }
  };

  return (
    <Layout>
      <div className="row clr-white">
        <div className="col col-12 col-md-6 fnt-jumbo p-4">
          <p className="fnt-primary mb-0">WELCOME TO WAVEAPP.</p>
          <p className="fnt-secondary mb-0">LOG IN.</p>
        </div>
        <div className="col col-12 col-md-6 clr-light py-4 px-5 fx-rounded">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="fnt-subtitle-bold mb-4">Log in</h1>
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
              classNames="mb-1"
            />
            <div className="fnt-caption">
              Forgot your password? Reset it,{" "}
              <Link to={PUBLIC.RESET_PASSWORD}>here.</Link>
            </div>
            <div className="form-footer-wrapper p-0 mt-4 row">
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
          </form>
          <div className="fnt-caption">
            First time in WaveApp?
            <br />
            Please, <Link to={PUBLIC.SIGN_UP}>sign up.</Link>
          </div>
          {loading && !loginError && !loggedIn && <h3>Loading...</h3>}
          {!loading && !loginError && loggedIn && (
            <h3>Logged in! Redirecting to Home...</h3>
          )}
          {!loading && loginError && !loggedIn && (
            <h3>Login error: {loginError}</h3>
          )}
        </div>
      </div>
    </Layout>
  );
}
