// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useDiaryFunctions from "../../hooks/useDiaryFunctions";

// custom hooks

export default function DiaryVersionSetup(props) {
  const uuid = useParams().uuid;

  const { diaryConfig, getVersions, renderTags } = useDiaryFunctions();

  useEffect(() => {
    getVersions(uuid);
  }, []);

  const formik = useFormik({
    initialValues: {
      version: "",
    },

    validationSchema: Yup.object({
      version: Yup.string()
        .max(10, "Version name must be less than 10 characters.")
        .required("The version name is required."),
    }),

    onSubmit: (values) => {
      props.nextStep();
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
      <h2>Version</h2>
      {renderTags(diaryConfig)}
      <p>
        Your project's issues can be organized and filtered by version names.
      </p>

      <input type="text" id="version" {...formik.getFieldProps("version")} />
      {renderFieldError("version")}
      <button type="submit" className="custom button-primary">
        Create Version
      </button>
    </StylizedForm>
  );
}
