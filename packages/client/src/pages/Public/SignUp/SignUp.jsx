import React, { useState } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import signUpSchema from "./sign-up-schema";
import {
  // getCurrentUserToken,
  signUpWithEmailAndPassword,
  signOut,
} from "../../../services/auth";
import { createClient } from "../../../api/account-api";
import "./SignUp.scss";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import { emailVerification } from "../../../services/auth/auth";
import { PUBLIC } from "../../../constants/routes";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [registered, setRegistered] = useState(false);
  const history = useHistory();

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
      setRegistered(false);

      try {
        await signUpWithEmailAndPassword(
          signUpState.email,
          signUpState.password,
        );
        await emailVerification();
        await createClient(signUpState);
        await signOut();
        setRegistered(true);
        setTimeout(() => {
          history.push(PUBLIC.HOME);
        }, 5000);
      } catch (error) {
        setRegisterError(error.message);
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
          {loading && !registerError && !registered && <h3>Loading...</h3>}
          {!loading && !registerError && registered && (
            <h3>
              Signed up! Check your email, we&aposve sent you a verification
              message. We&aposll redirect you to the sign in page in no time...
            </h3>
          )}
          {!loading && registerError && !registered && (
            <h3>Sign up error: {registerError}</h3>
          )}
        </div>
      </div>
    </Layout>
  );
}
