import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

import signUpSchema from "./sign-up-schema";
import {
  getCurrentUserToken,
  signInWithGoogle,
  signUpWithEmailAndPassword,
} from "../../../services/auth";
import { createClient } from "../../../api/account-api";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  async function handleLoginWithGoogle(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await signInWithGoogle();
      if (!user) history.push("/");
      console.log(user);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      profilePicture: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (signUpState) => {
      setLoading(true);
      setLoggedIn(false);

      try {
        console.log("signUpState", signUpState);
        await signUpWithEmailAndPassword(
          signUpState.email,
          signUpState.password,
        );
        const data = await createClient(signUpState);
        const token = await getCurrentUserToken();
        // TODO: Set to context
        console.log("data", data);
        console.log("token", token);
        setLoggedIn(true);
      } catch (error) {
        setLoginError(error.message);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <div>
      <body className="text-center">
        <main className="form-signin">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                errorMessage={formik.errors.username}
                hasErrorMessage={formik.touched.username}
                // placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="profilePicture"
                name="profilePicture"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.profilePicture}
                errorMessage={formik.errors.profilePicture}
                hasErrorMessage={formik.touched.profilePicture}
              />
              <label htmlFor="floatingInput">Profile picture</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                errorMessage={formik.errors.firstName}
                hasErrorMessage={formik.touched.firstName}
                // placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">First Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                errorMessage={formik.errors.lastName}
                hasErrorMessage={formik.touched.lastName}
                // placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Last Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="birthDate"
                name="birthDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birthDate}
                errorMessage={formik.errors.birthDate}
                hasErrorMessage={formik.touched.birthDate}
                // placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Birth date</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                errorMessage={formik.errors.country}
                hasErrorMessage={formik.touched.country}
                // placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Country</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                errorMessage={formik.errors.email}
                hasErrorMessage={formik.touched.email}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                errorMessage={formik.errors.password}
                hasErrorMessage={formik.touched.password}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                errorMessage={formik.errors.confirmPassword}
                hasErrorMessage={formik.touched.confirmPassword}
              />
              <label htmlFor="floatingPassword">Confirm password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
          </form>

          <button
            type="button"
            className="w-100 btn btn-lg btn-danger"
            onClick={handleLoginWithGoogle}
          >
            Sign Up with Google
          </button>

          {loading && !loginError && !loggedIn && <h3>Loading...</h3>}
          {!loading && !loginError && loggedIn && <h3>Logged in!</h3>}
          {!loading && loginError && !loggedIn && (
            <h3>Login error: {loginError}</h3>
          )}
        </main>
      </body>
    </div>
  );
}
