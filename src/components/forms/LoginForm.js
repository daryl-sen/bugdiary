import StylizedForm from "./StylizedForm";

export default function LoginForm(props) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("The email address you provided is invalid.")
        .required("Your email address is required, it will be used to log in."),
      password: Yup.string()
        .min(8, "Your password must be at least 8 characters.")
        .required("Your password is required for logging in."),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
}
