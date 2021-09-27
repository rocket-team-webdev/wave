import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import resetPasswordSchema from "./reset-pass-schema";
import { sendPasswordResetEmail } from "../../../services/auth";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { PUBLIC } from "../../../constants/routes";

export default function ResetPassword() {
  // const [passwordResetSent, setPasswordResetSent] = useState(false);

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
      // setPasswordResetSent(false);

      try {
        await sendPasswordResetEmail(form.email, config);
        // setPasswordResetSent(true);
        toast("Please visit your email to continue with password recovery", {
          type: "success",
        });
      } catch (error) {
        toast(error.message, { type: "error" });
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="fnt-subtitle-bold">Password recovery</div>
        <Input
          label="email"
          id="email"
          name="email"
          type="email"
          classNames="col mb-3 col-12 col-sm-8 col-md-5"
          placeholder="name@example.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          errorMessage={formik.errors.email}
          hasErrorMessage={formik.touched.email}
        />

        {/* {passwordResetSent ? (
          <p className="">
            Please visit your email to continue with password recovery
          </p>
        ) : (
          <p>&nbsp;</p>
        )} */}

        <Button isNegative submitButton>
          Reset password
        </Button>
      </form>
    </>
  );
}
