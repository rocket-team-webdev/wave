import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import resetPasswordSchema from "./reset-pass-schema";
import { sendPasswordResetEmail } from "../../../services/auth";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { PUBLIC } from "../../../constants/routes";
import Layout from "../../../components/Layout";
import FormWrapper from "../../../components/FormWrapper";
import JumboText from "../../../components/JumboText";

export default function ResetPassword() {
  const config = {
    url: PUBLIC.HOME,
    handleCodeInApp: true,
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (form) => {
      try {
        await sendPasswordResetEmail(form.email, config);
        toast("Please visit your email to continue with password recovery", {
          type: "success",
        });
      } catch (error) {
        toast(error.message, { type: "error" });
      }
    },
  });

  return (
    <Layout>
      <div className="row">
        <JumboText secText="Reset your password." />
        <div className="col-6">
          <FormWrapper formTitle="Password recovery">
            <form onSubmit={formik.handleSubmit} className="row">
              <Input
                label="email"
                id="email"
                name="email"
                type="email"
                classNames="mb-1"
                placeholder="name@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                errorMessage={formik.errors.email}
                hasErrorMessage={formik.touched.email}
              />

              <div className="mt-5 col-auto ms-auto">
                <Button submitButton>Reset password</Button>
              </div>
            </form>
          </FormWrapper>
        </div>
      </div>
    </Layout>
  );
}
