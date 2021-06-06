import { Link } from "react-router-dom";
import LoadingIndicator from "../elements/LoadingIndicator";

// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";

// custom hooks
import useUserFunctions from "../../hooks/useUserFunctions";

export default function NewDiaryForm(props) {
  const formik = useFormik({
    initialValues: {},
    validationSchema: {},
    onSubmit: () => {},
  });

  return (
    <StylizedForm formik={formik}>
      {loadingStatus && <LoadingIndicator />}

      <label for=""></label>
      <input type=""></input>
      {formik.touched.displayName && formik.errors.displayName ? (
        <div className="form-error">{formik.errors.displayName}</div>
      ) : null}
    </StylizedForm>
  );
}
