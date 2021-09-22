import * as Yup from "yup";

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("This must be a valid email address"),
});

export default resetPasswordSchema;
