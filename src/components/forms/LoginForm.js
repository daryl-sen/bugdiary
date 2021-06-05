import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";

// context
import { useContext, useState } from "react";
import { UserContext } from "../../App";

// notifications
import { NotificationManager } from "react-notifications";

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
      const { email, password } = values;
      loginUser(email, password);
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
        {...formik.getFieldProps("password")}
      />
      <button type="submit" class="button-primary">
        Log In
      </button>
      <Link to="/signup">
        <button type="button" class="custom">
          Sign up
        </button>
      </Link>
    </StylizedForm>
  );
}
