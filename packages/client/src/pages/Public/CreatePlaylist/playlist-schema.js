import * as Yup from "yup";

const playlistSchema = Yup.object().shape({
  name: Yup.string().required("Playlist name is required"),
});

export default playlistSchema;
