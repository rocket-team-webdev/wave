import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";

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
import Spinner from "../../../components/Spinner";

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
        const formData = new FormData();
        formData.append("profilePicture", signUpState.profilePicture);
        formData.append("firstName", signUpState.firstName);
        formData.append("lastName", signUpState.lastName);
        formData.append("birthDate", signUpState.birthDate);
        formData.append("country", signUpState.country);
        formData.append("email", signUpState.email);
        await signUpWithEmailAndPassword(
          signUpState.email,
          signUpState.password,
        );
        await emailVerification();
        await createClient(formData);
        await signOut();
        toast(
          " Signed up! Check your email, we have sent you a verification message. We will redirect you to the sign in page in no time...",
          { type: "warning" },
        );

        setTimeout(() => {
          history.push(PUBLIC.HOME);
        }, 5000);
      } catch (error) {
        toast(error.message, { type: "error" });
      }
      setLoading(false);
    },
  });

  const profilePictureOnChange = async (event) => {
    formik.setFieldValue("profilePicture", event.target.files[0]);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const googleResult = await signInWithGoogle();
      const {
        family_name: familyName,
        given_name: givenName,
        picture,
      } = googleResult.additionalUserInfo.profile;

      const formData = new FormData();
      formData.append("profilePicture", picture);
      formData.append("firstName", givenName);
      formData.append("lastName", familyName);

      await createClient(formData);
      setTimeout(() => {
        history.push(PUBLIC.HOME);
      }, 500);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="row p-0 m-0 col col-12 pb-5 pb-sm-0">
        {loading ? (
          <div className="col col-12 col-lg-6">
            <Spinner />
          </div>
        ) : (
          <div className="col col-12 col-lg-6">
            <JumboText cols="12" secText="Sign up." />
          </div>
        )}
        <div className="col col-12 col-lg-6">
          <FormWrapper formTitle="Create New Account">
            <form onSubmit={formik.handleSubmit} className="row">
              <Input
                classNames="col-12 col-md-6"
                label="First Name"
                id="firstName"
                type="text"
                placeholder="First name"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.firstName}
                errorMessage={formik.errors.firstName}
                hasErrorMessage={formik.touched.firstName}
                disabled={loading}
              />
              <Input
                classNames="col-12 col-md-6"
                label="Last Name"
                id="lastName"
                type="text"
                placeholder="Last name"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.lastName}
                errorMessage={formik.errors.lastName}
                hasErrorMessage={formik.touched.lastName}
                disabled={loading.isLoading || loading.isError}
              />

              <Input
                classNames="col-12 col-md-6"
                label="Birth Date"
                id="birthDate"
                type="date"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.birthDate}
                errorMessage={formik.errors.birthDate}
                hasErrorMessage={formik.touched.birthDate}
                disabled={loading.isLoading || loading.isError}
              />

              <Select
                classNames="col-12 col-md-6"
                label="Country"
                id="country"
                type="select"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
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
                disabled={loading.isLoading || loading.isError}
              />

              <Input
                classNames="col-12 col-md-6"
                label="Profile Picture"
                id="profilePicture"
                type="file"
                placeholder="Choose your file"
                handleChange={profilePictureOnChange}
                handleBlur={formik.handleBlur}
                errorMessage={formik.errors.profilePicture}
                hasErrorMessage={formik.touched.profilePicture}
                disabled={loading.isLoading || loading.isError}
              />
              <Input
                classNames="col-12 col-md-6"
                label="Email"
                id="email"
                type="email"
                placeholder="name@example.com"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.email}
                errorMessage={formik.errors.email}
                hasErrorMessage={formik.touched.email}
                disabled={loading.isLoading || loading.isError}
              />

              <Input
                classNames="col-12 col-md-6"
                label="Password"
                id="password"
                type="password"
                placeholder="Password"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.password}
                errorMessage={formik.errors.password}
                hasErrorMessage={formik.touched.password}
                disabled={loading.isLoading || loading.isError}
              />

              <Input
                classNames="col-12 col-md-6"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                errorMessage={formik.errors.confirmPassword}
                hasErrorMessage={formik.touched.confirmPassword}
                disabled={loading.isLoading || loading.isError}
              />
              <div className="form-footer-wrapper d-flex row mt-3">
                <div className="fnt-caption col col-6">
                  Already have an account? <br /> Please,{" "}
                  <Link to={PUBLIC.SIGN_IN}>sign in.</Link>
                </div>
                <div className="d-flex justify-content-end col col-6 text-end p-0">
                  <div className="d-inline-flex p-2 pe-2">
                    <Button handleClick={handleGoogleSignIn}>
                      <FaGoogle />
                    </Button>
                  </div>
                  <div className="p-2">
                    <Button type="submit">Sign Up</Button>
                  </div>
                </div>
              </div>
            </form>
          </FormWrapper>
        </div>
      </div>
    </Layout>
  );
}
