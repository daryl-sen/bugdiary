import { Link } from "react-router-dom";
import LoadingIndicator from "../elements/LoadingIndicator";

// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";

// custom hooks
import useUserFunctions from "../../hooks/useUserFunctions";

export default function DiaryLocationSetup() {
  const formik = useFormik({
    initialValues: {
      location: "",
    },

    validationSchema: Yup.object({
      location: Yup.string().max(
        10,
        "Location name must be less than 10 characters."
      ),
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
      <h2>Location</h2>
      <p>
        Issues can occur at different locations. List a few for users to pick.
        (Optional)
      </p>

      <input type="text" id="version" {...formik.getFieldProps("version")} />
      {renderFieldError("version")}
      <button type="submit" className="custom">
        Create Location
      </button>
      <hr />
      <p>Almost there!</p>
      <button type="button" className="custom button-primary">
        Next Step
      </button>
      <button type="button" className="custom button-secondary">
        Skip
      </button>
    </StylizedForm>
  );
}
