import * as Yup from "yup";

const playlistSchema = Yup.object().shape({
  title: Yup.string().required("The title is required"),
  year: Yup.number().required("The release year is required"),
});

export default playlistSchema;
