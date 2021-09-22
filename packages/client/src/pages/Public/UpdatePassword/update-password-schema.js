import * as Yup from "yup";

const updatePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("The current password is required")
    .min(3, "The password is too short")
    .max(40, "The password is too long"),
  newPassword: Yup.string()
    .required("The new password can not be empty")
    .min(3, "The password is too short")
    .max(40, "The password is too long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("The new password must be confirmed"),
});

export default updatePasswordSchema;
