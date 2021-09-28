import * as Yup from "yup";

const uploadSchema = Yup.object().shape({
  title: Yup.string().required("The title is required"),
});

export default uploadSchema;
