import * as Yup from "yup";

const updateSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "The username is too short!")
    .max(50, "The username is too long!"),
  profilePicture: Yup.string().url("This is not a valid URL"), // TODO: change from URL to upload picture
  firstName: Yup.string()
    .min(2, "The first name is too short!")
    .max(50, "The first name is too long!")
    .matches(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, "Only letters accepted"),
  lastName: Yup.string()
    .min(2, "The last name is too short!")
    .max(50, "The last name is too long!")
    .matches(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, "Only letters accepted"),
  birthDate: Yup.date("Not a valid date"),
  // country: Yup.string()
  //   .min(2, "The country is too short!")
  //   .max(50, "The country is too long!")
  //   .matches(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, "Only letters accepted"),
  email: Yup.string().email("This must be a valid email address"),
});

export default updateSchema;
