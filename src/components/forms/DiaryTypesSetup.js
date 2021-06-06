import { Link } from "react-router-dom";
import LoadingIndicator from "../elements/LoadingIndicator";

// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";

// custom hooks
import useUserFunctions from "../../hooks/useUserFunctions";

export default function DiaryTypesSetup(props) {
  const formik = useFormik({
    initialValues: {
      type: "",
    },

    validationSchema: Yup.object({
      type: Yup.string()
        .max(10, "Version name must be less than 10 characters.")
        .required("The type name is required."),
    }),

    onSubmit: (values) => {
      console.log(values); // validates and creates
    },
  });

  const renderFieldError = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return <div className="form-error">{formik.errors[fieldName]}</div>;
    }
  };

  return (
    <StylizedForm formik={formik}>
      <h2>Types</h2>
      <p>
        Your project might encounter different types of issues. Create some
        options for your users to choose from.
      </p>

      <input type="text" id="version" {...formik.getFieldProps("version")} />
      {renderFieldError("version")}
      <button type="submit" className="custom">
        Create Type
      </button>
      <hr />
      <p>That's it!</p>
      <button type="button" className="custom button-primary">
        Go to Diary
      </button>
    </StylizedForm>
  );
}
