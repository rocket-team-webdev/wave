import React, { useState, useRef } from "react";
import { useFormik } from "formik";
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

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import Checkbox from "../../../components/Checkbox";
import { isRegistering } from "../../../redux/user/actions";

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
      <div className="row clr-white">
        <div className="col col-12 col-md-6 fnt-jumbo p-4">
          <p className="fnt-primary">WELCOME TO WAVEAPP.</p>
          <p>LOG IN.</p>
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
              classNames="mb-4"
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
            <div className="form-footer-wrapper p-0 row">
              <Checkbox
                label="Remember account"
                id="testCheckbox"
                ref={credentialsCheckbox}
                checked={saveCredentials}
                onChange={handleSaveCredentials}
              />
              <div className="d-flex justify-content-end col col-12 col-md-7 p-0">
                <div className="d-inline-flex p-2 pe-4">
                  <Button handleClick={handleGoogleSignIn}>Google</Button>
                </div>
                <div className="d-inline-flex p-2">
                  <Button submitButton>Sign in</Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* {loading && !loginError && !loggedIn && <h3>Loading...</h3>} */}
        {loading && <h3>Loading...</h3>}
        {/* {!loading && !loginError && loggedIn && <h3>Logged in!</h3>} */}
        {/* {!loading && loginError && !loggedIn && (
          <h3>Login error: {loginError}</h3>
        )} */}

        {/* {!loading && loginError && !loggedIn && <Toast message={loginError} />} */}
      </div>
    </Layout>
  );
}
