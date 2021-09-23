import * as Yup from "yup";

const signInSchema = Yup.object().shape({
  email: Yup.string().email("This must be a valid email address"),
  password: Yup.string()
    .min(3, "The password is too short")
    .max(40, "The password is too long"),
});

export default signInSchema;
