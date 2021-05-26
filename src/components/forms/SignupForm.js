import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function SignupForm(props) {
  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
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
      bio: Yup.string().max(
        200,
        "Your bio is too long, please keep it under 200 characters."
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <StylizedForm formik={formik}>
      <label htmlFor="displayName">Display Name</label>
      <input
        id="displayName"
        type="text"
        {...formik.getFieldProps("displayName")}
      />
      {formik.touched.displayName && formik.errors.displayName ? (
        <div class="form-error">{formik.errors.displayName}</div>
      ) : null}

      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...formik.getFieldProps("email")} />
      {formik.touched.email && formik.errors.email ? (
        <div class="form-error">{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        {...formik.getFieldProps("password")}
      />
      {formik.touched.password && formik.errors.password ? (
        <div class="form-error">{formik.errors.password}</div>
      ) : null}

      <label htmlFor="bio">Short Bio</label>
      <textarea id="bio" {...formik.getFieldProps("bio")}></textarea>
      {formik.touched.bio && formik.errors.bio ? (
        <div class="form-error">{formik.errors.bio}</div>
      ) : null}
    </StylizedForm>
  );
}
