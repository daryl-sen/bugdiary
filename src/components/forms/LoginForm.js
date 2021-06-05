import { Link } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";

// form
import StylizedForm from "./StylizedForm";
import { useFormik } from "formik";

// custom hooks
import useUserFunctions from "../../hooks/useUserFunctions";

export default function LoginForm(props) {
  const { loginUser, loadingStatus } = useUserFunctions();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      loginUser(values.email, values.password); // validate and create
    },
  });

  return (
    <StylizedForm formik={formik}>
      {loadingStatus && <LoadingIndicator />}
      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...formik.getFieldProps("email")} />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        autoComplete="off"
        {...formik.getFieldProps("password")}
      />
      <button type="submit" className="button-primary">
        Log In
      </button>
      <Link to="/signup">
        <button type="button" className="custom">
          Sign up
        </button>
      </Link>
    </StylizedForm>
  );
}
