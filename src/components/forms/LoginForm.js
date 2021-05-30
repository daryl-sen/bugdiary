import { useState } from "react";
import LoadingIndicator from "../LoadingIndicator";

import StylizedForm from "./StylizedForm";
import { useFormik } from "formik";
import { useContext } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";

export default function LoginForm(props) {
  const [loadingStatus, setLoadingStatus] = useState(false);

  const history = useHistory();

  const uinfo = useContext(UserContext);
  // console.log(uinfo);

  const loginUser = async (email, password) => {
    const accessToken = await axios
      .post("/api/users/login", {
        email,
        password,
      })
      .then((resp) => {
        if (resp.data.accessToken) {
          return resp.data.accessToken;
        }
        return null;
      });

    if (accessToken) {
      uinfo.setUserSession((prev) => {
        return { ...prev, jwt: accessToken };
      });
      return true;
    } else {
      return false;
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoadingStatus(true);
      const { email, password } = values;
      const authenticated = await loginUser(email, password);
      if (authenticated) {
        NotificationManager.success("Welcome back!", "Logged In");
        history.push("/" + props.next);
      } else {
        setLoadingStatus(false);
        NotificationManager.error(
          "User or password is incorrect.",
          "Login Failed"
        );
      }
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
      <button type="submit">Log In</button>
    </StylizedForm>
  );
}
