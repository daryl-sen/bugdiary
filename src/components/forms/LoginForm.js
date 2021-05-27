import StylizedForm from "./StylizedForm";
import { useFormik } from "formik";
import { useContext } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

export default function LoginForm(props) {
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
        console.log(resp);
        if (resp.data.accessToken) {
          return resp.data.accessToken;
        }
        return null;
      });

    if (accessToken) {
      uinfo.setUserSession((prev) => {
        return { ...prev, jwt: "test" };
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
      const { email, password } = values;
      const authenticated = await loginUser(email, password);
      if (authenticated) {
        console.log("authenticated!");
        history.push("/");
      } else {
        console.log("No.");
      }
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
