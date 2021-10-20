import * as Yup from "yup";

const ReauthenticateSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("The new password is required")
    .min(3, "The password is too short")
    .max(40, "The password is too long"),
});

export default ReauthenticateSchema;
