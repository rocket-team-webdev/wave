import React, { useState } from "react";
import { useFormik } from "formik";
import signInSchema from "./sign-in-schema";
import { createClient, signInUserData } from "../../../api/account-api";
import { signInWithGoogle, signIn } from "../../../services/auth";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (signInState) => {
      setLoading(true);
      setLoggedIn(false);

      try {
        const signInResponse = await signIn(
          signInState.email,
          signInState.password,
        );

        const token = signInResponse.user.multiFactor.user.accessToken;
        // const firebaseId = logInResponse.user.uid;
        const response = await signInUserData(token);
        console.log("Sign in response: ", response);

        // TODO: Set to context, validate to db
        setLoggedIn(true);
      } catch (error) {
        setLoginError(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleSignIn = async () => {
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

    const data = await createClient(loggedUserObject);

    console.log("nuestro backemnd", data);
    console.log("firebase backemnd", googleResult);

    // const response = await signInUserData(googleResult.credential.accessToken);
    // console.log(response);
  };

  return (
    <>
      <div className="row clr-white">
        <div className="col col-12 col-md-6 fnt-jumbo p-4">
          <p className="fnt-primary">WELCOME TO WAVEAPP.</p>

          <p>LOG IN.</p>
        </div>
        <div className="col col-12 col-md-6 clr-light py-4 px-5 fx-rounded">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="fnt-subtitle-bold mb-4">Log in</h1>
            <Input
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
              <div className="col col-12 col-md-4">
                <input type="checkbox" className="me-2" id="rememberAccount" />
                <label
                  type="checkbox"
                  htmlFor="rememberAccount"
                  className="fnt-input-light"
                >
                  Remember account
                </label>
              </div>
              <div className="d-flex justify-content-end col col-12 col-md-8 p-0">
                <div className="d-inline-flex p-2 pe-4">
                  <Button handleClick={handleGoogleSignIn}>Google</Button>
                </div>
                <div className="d-inline-flex p-2">
                  <Button submitButton>Sign in</Button>
                </div>
              </div>
            </div>
          </form>
          {loading && !loginError && !loggedIn && <h3>Loading...</h3>}
          {!loading && !loginError && loggedIn && <h3>Logged in!</h3>}
          {!loading && loginError && !loggedIn && (
            <h3>Login error: {loginError}</h3>
          )}
        </div>
      </div>
    </>
  );
}
