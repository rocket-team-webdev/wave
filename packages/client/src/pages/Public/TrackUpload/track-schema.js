import * as Yup from "yup";

const uploadSchema = Yup.object().shape({
  name: Yup.string().required("The title is required"),
  artist: Yup.string().required("The artist is required"),
  genre: Yup.string()
    .required("Genre is required")
    .notOneOf(["Select genre"], "Please select a genre"),
  album: Yup.string()
    .required("Album is required")
    .notOneOf(["Select album"], "Please select an album"),
});

export default uploadSchema;
