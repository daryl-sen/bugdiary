import { Link } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";

// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";

// custom hooks
import useUserFunctions from "../../hooks/useUserFunctions";

export default function SignupForm(props) {
  const { createUser, loadingStatus } = useUserFunctions();

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      bio: "",
    },

    validationSchema: Yup.object({
      displayName: Yup.string()
        .max(30, "Please keep your display name less than 30 characters.")
        .required(
          "Your display name is required. It doesn't have to be your real name or unique."
        ),
      email: Yup.string()
        .email("The email address you provided is invalid.")
        .required("Your email address is required, it will be used to log in."),
      password: Yup.string()
        .min(8, "Your password must be at least 8 characters.")
        .required("Your password is required for loggin in."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match!")
        .required(),
      bio: Yup.string().max(
        200,
        "Your bio is too long, please keep it under 200 characters."
      ),
    }),

    onSubmit: async (values) => {
      await createUser(values); // validates and creates
    },
  });

  return (
    <StylizedForm formik={formik}>
      {loadingStatus && <LoadingIndicator />}
      <label htmlFor="displayName">Display Name</label>
      <input
        id="displayName"
        type="text"
        {...formik.getFieldProps("displayName")}
      />
      {formik.touched.displayName && formik.errors.displayName ? (
        <div className="form-error">{formik.errors.displayName}</div>
      ) : null}

      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...formik.getFieldProps("email")} />
      {formik.touched.email && formik.errors.email ? (
        <div className="form-error">{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        autoComplete="off"
        {...formik.getFieldProps("password")}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="form-error">{formik.errors.password}</div>
      ) : null}

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        type="password"
        autoComplete="off"
        {...formik.getFieldProps("confirmPassword")}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div className="form-error">{formik.errors.confirmPassword}</div>
      ) : null}

      <label htmlFor="bio">Short Bio</label>
      <textarea id="bio" {...formik.getFieldProps("bio")}></textarea>
      {formik.touched.bio && formik.errors.bio ? (
        <div className="form-error">{formik.errors.bio}</div>
      ) : null}

      <button type="submit" className="button-primary">
        Sign Up
      </button>
      <Link to="/login">
        <button type="button" className="custom">
          Login
        </button>
      </Link>
    </StylizedForm>
  );
}
