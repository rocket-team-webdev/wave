import React, { useState } from "react";
import { useFormik } from "formik";

import signUpSchema from "./sign-up-schema";
import {
  getCurrentUserToken,
  signUpWithEmailAndPassword,
} from "../../../services/auth";
import { createClient } from "../../../api/account-api";
import "./SignUp.scss";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

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
    <Layout>
      <div className="row clr-light">
        <div className="col">
          <span className="fnt-jumbo fnt-primary">WELCOME TO WAVE APP.</span>
          <span className="fnt-jumbo fnt-secondary">SIGN IN.</span>
        </div>
        <div className="col">
          <body className="text-center">
            <div className="form-signin">
              <form onSubmit={formik.handleSubmit}>
                <h1 className="fnt-subtitle-bold">New Account</h1>
                <Input
                  label="Username"
                  id="username"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  errorMessage={formik.errors.username}
                  hasErrorMessage={formik.touched.username}
                />
                <Input
                  label="Profile Picture"
                  id="profilePicture"
                  type="file"
                  placeholder="Choose your file"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.profilePicture}
                  errorMessage={formik.errors.profilePicture}
                  hasErrorMessage={formik.touched.profilePicture}
                />
                <Input
                  label="First Name"
                  id="firstName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  errorMessage={formik.errors.firstName}
                  hasErrorMessage={formik.touched.firstName}
                />
                <Input
                  label="Last Name"
                  id="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  errorMessage={formik.errors.lastName}
                  hasErrorMessage={formik.touched.lastName}
                />

                <Input
                  label="Birth Date"
                  id="birthDate"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.birthDate}
                  errorMessage={formik.errors.birthDate}
                  hasErrorMessage={formik.touched.birthDate}
                />

                <Input
                  label="Country"
                  id="country"
                  type="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  errorMessage={formik.errors.country}
                  hasErrorMessage={formik.touched.country}
                />

                <Input
                  label="Email"
                  id="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  errorMessage={formik.errors.email}
                  hasErrorMessage={formik.touched.email}
                />

                <Input
                  label="Password"
                  id="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  errorMessage={formik.errors.password}
                  hasErrorMessage={formik.touched.password}
                />

                <Input
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  errorMessage={formik.errors.confirmPassword}
                  hasErrorMessage={formik.touched.confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
              </form>
              {loading && !loginError && !loggedIn && <h3>Loading...</h3>}
              {!loading && !loginError && loggedIn && <h3>Logged in!</h3>}
              {!loading && loginError && !loggedIn && (
                <h3>Login error: {loginError}</h3>
              )}
            </div>
          </body>
        </div>
      </div>
    </Layout>
  );
}
