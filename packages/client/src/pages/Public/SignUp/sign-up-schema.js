import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "The first name is too short!")
    .max(50, "The first name is too long!")
    .matches(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, "Only letters accepted"),
  password: Yup.string()
    .min(3, "The password is too short")
    .max(20, "The password is too long"),
  email: Yup.string().email("This must be a valid email address"),
});

export default signUpSchema;
