import * as Yup from "yup";

const playlistUpdateSchema = Yup.object().shape({
  name: Yup.string().required("Playlist name is required"),
});

export default playlistUpdateSchema;
