import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

import signUpSchema from "./reset-pass-schema";
import { sendPasswordResetEmail } from "../../../services/auth";

export default function ResetPassword() {
  const [resetPasswordError, setResetPasswordError] = useState(null);
  const [passwordResetSent, setPasswordResetSent] = useState(false);

  const config = {
    url: "http://localhost:3000/",
    handleCodeInApp: true,
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (form) => {
      setPasswordResetSent(false);
      setResetPasswordError(null);

      try {
        await sendPasswordResetEmail(form.email, config);
        setPasswordResetSent(true);
      } catch (error) {
        setResetPasswordError(error.message);
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

            {passwordResetSent && !resetPasswordError && (
              <p className="text-success">
                Please visit your email to continue with password recovery
              </p>
            )}

            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Reset password
            </button>
          </form>

          {resetPasswordError && <h3>Error: {resetPasswordError}</h3>}
        </main>
      </body>
    </div>
  );
}
