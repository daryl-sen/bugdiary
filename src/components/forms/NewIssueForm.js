import { Link } from "react-router-dom";
import LoadingIndicator from "../elements/LoadingIndicator";

// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";

// custom hooks
import useUserFunctions from "../../hooks/useUserFunctions";

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
        id="reference"
        type="text"
        {...formik.getFieldProps("reference")}
        placeholder="(Optional)"
      />
      {renderFieldError("reference")}

      <label htmlFor="location_id">Location</label>
      <datalist id="location_suggestions">
        <option value="Option 1"></option>
        <option value="Option 2"></option>
        <option value="Option 3"></option>
      </datalist>
      <input
        id="location_id"
        type="text"
        {...formik.getFieldProps("location_id")}
        placeholder="Where did you find it?"
        list="location_suggestions"
      />
      {renderFieldError("location_id")}

      <label htmlFor="type_id">Type</label>
      <input
        id="type_id"
        type="text"
        {...formik.getFieldProps("type_id")}
        placeholder="What kind of issue is it?"
        list="type_suggestions"
      />
      <datalist id="type_suggestions">
        <option value="Option 1"></option>
        <option value="Option 2"></option>
        <option value="Option 3"></option>
      </datalist>
      {renderFieldError("type_id")}

      <label htmlFor="details">Issue Details</label>
      <textarea id="details" {...formik.getFieldProps("details")}></textarea>
      {renderFieldError("details")}

      <label htmlFor="reporter_email">Contact Email</label>
      <input
        id="reporter_email"
        type="email"
        {...formik.getFieldProps("reporter_email")}
        placeholder="(Optional)"
      />
      {renderFieldError("reporter_email")}

      <label htmlFor="reporter_name">Contact Name</label>
      <input
        id="reporter_name"
        type="text"
        {...formik.getFieldProps("reporter_name")}
        placeholder="(Optional)"
      />
      {renderFieldError("reporter_name")}

      <button type="submit" className="button-primary">
        Report Issue
      </button>
    </StylizedForm>
  );
}
