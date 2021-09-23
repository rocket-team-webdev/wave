import React, { useState } from "react";
import { useFormik } from "formik";

import signUpSchema from "./sign-up-schema";

import {
  getCurrentUserToken,
  // signInWithGoogle,
  signUpWithEmailAndPassword,
} from "../../../services/auth";
import { createClient } from "../../../api/account-api";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Select from "../../../components/Select";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // async function handleLoginWithGoogle(e) {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     await signInWithGoogle();
  //   } catch (error) {
  //     setLoginError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const formik = useFormik({
    initialValues: {
      username: "",
      profilePicture: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      country: "Spain",
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
      <div className="row clr-white">
        <div className="col-7 p-4">
          <p className="fnt-jumbo fnt-primary mb-0">WELCOME TO WAVE APP.</p>
          <p className="fnt-jumbo fnt-secondary mb-0">SIGN UP.</p>
        </div>
        <div className="col-5 clr-light">
          <h1 className="fnt-subtitle-bold mb-4">New Account</h1>
          <form onSubmit={formik.handleSubmit} className="row">
            <Input
              classNames="col-6"
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
              classNames="col-6"
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
              classNames="col-6"
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
              classNames="col-6"
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
              classNames="col-6"
              label="Birth Date"
              id="birthDate"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthDate}
              errorMessage={formik.errors.birthDate}
              hasErrorMessage={formik.touched.birthDate}
            />

            <Select
              classNames="col-6"
              label="Country"
              id="country"
              type="select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
              errorMessage={formik.errors.country}
              hasErrorMessage={formik.touched.country}
              options={[
                "Spain",
                "Argentina",
                "Morocco",
                "France",
                "Italy",
                "Germany",
                "USA",
                "Mexico",
                "Catalonia",
              ]}
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
              classNames="col-6"
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
              classNames="col-6"
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              errorMessage={formik.errors.confirmPassword}
              hasErrorMessage={formik.touched.confirmPassword}
            />
            <div className="col-12 text-end mt-3">
              <Button type="submit">Sign Up</Button>
            </div>
          </form>
          {loading && !loginError && !loggedIn && <h3>Loading...</h3>}
          {!loading && !loginError && loggedIn && <h3>Logged in!</h3>}
          {!loading && loginError && !loggedIn && (
            <h3>Login error: {loginError}</h3>
          )}
        </div>
      </div>
    </Layout>
  );
}
