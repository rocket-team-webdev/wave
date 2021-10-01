import * as Yup from "yup";

const uploadSchema = Yup.object().shape({
  title: Yup.string().required("The title is required"),
  artist: Yup.string().required("The artist is required"),
  genre: Yup.string().required("Genre is required"),
  album: Yup.string().required("Album is required"),
});

export default uploadSchema;
