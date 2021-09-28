import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import signUpSchema from "./sign-up-schema";
import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  signOut,
} from "../../../services/auth";
import { createClient } from "../../../api/account-api";

import JumboText from "../../../components/JumboText/JumboText";
import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Select from "../../../components/Select";

import { emailVerification } from "../../../services/auth/auth";
import { PUBLIC } from "../../../constants/routes";
import FormWrapper from "../../../components/FormWrapper";

import "./SignUp.scss";

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
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

      try {
        await signUpWithEmailAndPassword(
          signUpState.email,
          signUpState.password,
        );
        await emailVerification();
        await createClient(signUpState);
        await signOut();

        toast(
          " Signed up! Check your email, we&aposve sent you a verification message. We&aposll redirect you to the sign in page in no time...",
          { type: "warning" },
        );

        setTimeout(() => {
          history.push(PUBLIC.HOME);
        }, 5000);
      } catch (error) {
        toast(error.message, { type: "error" });
      } finally {
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
      setTimeout(() => {
        history.push(PUBLIC.HOME);
      }, 500);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  return (
    <Layout>
      <div className="row">
        <JumboText secText="Sign up." />
        <div className="col-6">
          <FormWrapper formTitle="Create New Account">
            <form onSubmit={formik.handleSubmit} className="row">
              <Input
                classNames="col-12 col-md-6"
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
                classNames="col-12 col-md-6"
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
                classNames="col-12 col-md-6"
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
                classNames="col-12 col-md-6"
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
                classNames="col-12 col-md-6"
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
                classNames="col-12 col-md-6"
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
                classNames="col-12 col-md-6"
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
                classNames="col-12 col-md-6"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                errorMessage={formik.errors.confirmPassword}
                hasErrorMessage={formik.touched.confirmPassword}
              />
              <div className="fnt-caption">
                Already have an account?{" "}
                <Link to={PUBLIC.SIGN_IN}>Sign in.</Link>
              </div>
              <div className="d-flex justify-content-end col-12 text-end mt-4 p-0">
                <div className="d-inline-flex p-2 pe-2">
                  <Button handleClick={handleGoogleSignIn}>
                    <i className="fab fa-google" />
                  </Button>
                </div>
                <div className="p-2">
                  <Button type="submit">Sign Up</Button>
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
