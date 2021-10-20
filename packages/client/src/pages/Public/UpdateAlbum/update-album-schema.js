import * as Yup from "yup";

const albumSchema = Yup.object().shape({
  title: Yup.string().required("The title is required"),
  year: Yup.number()
    .required("The release year is required")
    .test(
      "len",
      "Must be a valid year",
      (val) => val && val.toString().length === 4,
    )
    .max(new Date().getFullYear(), "This cannot be greater than current year")
    .min("1500", "The album cannot be that old!"),
});

export default albumSchema;
