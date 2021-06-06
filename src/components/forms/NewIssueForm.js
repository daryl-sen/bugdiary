import { Link } from "react-router-dom";
import LoadingIndicator from "../elements/LoadingIndicator";

// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";

// custom hooks
import useUserFunctions from "../../hooks/useUserFunctions";

// {
//   "details": "This #1",
//   "status": "PENDING",
//   "reporter_name": "Me",
//   "reporter_email": "email@fakemail.com",
//   "resolve_date": "2021-05-30T03:44:36.067Z",
//   "priority": 1,
//   "diary_id": 1,
//   "type_id": 1,
//   "location_id": 1,
//   "version_id": 1
// },

export default function NewIssueForm(props) {
  const { createUser, loadingStatus } = useUserFunctions();

  const formik = useFormik({
    initialValues: {
      reference: "",
      details: "",
      reporter_name: "",
      reporter_email: "",
      type_id: "",
      location_id: "",
      version_id: "",
    },

    validationSchema: Yup.object({
      reference: Yup.string().max(
        20,
        "Please keep your reference heading less than 20 characters."
      ),
      details: Yup.string()
        .max(500, "Please keep the issue details less than 500 characters.")
        .required("Please fill out the issue details."),
      reporter_name: Yup.string().max(
        20,
        "Please keep your name under 20 characters."
      ),
      reporter_email: Yup.string().email(
        "The email address you provided is invalid."
      ),
    }),

    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const renderFieldError = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return <div className="form-error">{formik.errors[fieldName]}</div>;
    }
  };

  return (
    <StylizedForm formik={formik}>
      {loadingStatus && <LoadingIndicator />}

      <label htmlFor="reference">Heading</label>
      <input
        id="displayName"
        type="text"
        {...formik.getFieldProps("displayName")}
        placeholder="(Optional)"
      />
      {renderFieldError("displayName")}

      <label htmlFor="reference">Location</label>
      <input
        id="displayName"
        type="text"
        {...formik.getFieldProps("displayName")}
        placeholder="Where did you find it?"
      />
      {renderFieldError("displayName")}

      <label htmlFor="reference">Type</label>
      <input
        id="displayName"
        type="text"
        {...formik.getFieldProps("displayName")}
        placeholder="What kind of issue is it?"
      />
      {renderFieldError("displayName")}

      <label htmlFor="bio">Issue Details</label>
      <textarea id="bio" {...formik.getFieldProps("bio")}></textarea>
      {renderFieldError("bio")}

      <label htmlFor="email">Contact Email</label>
      <input
        id="email"
        type="email"
        {...formik.getFieldProps("email")}
        placeholder="(Optional)"
      />
      {renderFieldError("email")}

      <label htmlFor="reference">Contact Name</label>
      <input
        id="displayName"
        type="text"
        {...formik.getFieldProps("displayName")}
        placeholder="(Optional)"
      />
      {renderFieldError("displayName")}

      <button type="submit" className="button-primary">
        Report Issue
      </button>
    </StylizedForm>
  );
}
