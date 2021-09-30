import * as Yup from "yup";

const albumSchema = Yup.object().shape({
  title: Yup.string().required("The title is required"),
  year: Yup.number().required("The release year is required"),
});

export default albumSchema;
