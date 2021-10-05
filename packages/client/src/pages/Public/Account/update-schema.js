import * as Yup from "yup";

const updateSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "The first name is too short!")
    .max(50, "The first name is too long!")
    .matches(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, "Only letters accepted")
    .required("The first name is required"),
  lastName: Yup.string()
    .min(2, "The last name is too short!")
    .max(50, "The last name is too long!")
    .matches(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, "Only letters accepted")
    .required("The last name is required"),
  birthDate: Yup.date("Not a valid date").required("The birthdate is required"),
  email: Yup.string()
    .email("This must be a valid email address")
    .required("The email is required"),
});

export default updateSchema;
