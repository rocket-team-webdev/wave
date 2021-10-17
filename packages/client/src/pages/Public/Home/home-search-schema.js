import * as Yup from "yup";

const homeSearchSchema = Yup.object().shape({
  searchedBar: Yup.string()
    .min(1, "The text is too short")
    .max(100, "The text is too long"),
});

export default homeSearchSchema;
