import * as Yup from "yup";

const updateSongSchema = Yup.object().shape({
  title: Yup.string().required("The title is required").trim(),
  artist: Yup.string().required("The artist is required").trim(),
  genre: Yup.string().required("Genre is required"),
  album: Yup.string().required("Album is required"),
});

export default updateSongSchema;
