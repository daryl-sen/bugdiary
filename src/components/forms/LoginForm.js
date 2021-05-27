import StylizedForm from "./StylizedForm";
import { useFormik } from "formik";

export default function LoginForm(props) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <StylizedForm formik={formik}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...formik.getFieldProps("email")} />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        {...formik.getFieldProps("password")}
      />
      <button type="submit">Log In</button>
    </StylizedForm>
  );
}
