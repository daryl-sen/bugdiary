// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useDiarySetupFunctions from "../../hooks/useDiarySetupFunctions";

// custom hooks

export default function DiaryVersionSetup(props) {
  const uuid = useParams().uuid;

  const {
    diaryConfig,
    getVersions,
    createVersion,
    renderTags,
  } = useDiarySetupFunctions();

  useEffect(() => {
    getVersions(uuid);
  }, [diaryConfig]);

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(10, "Version name must be less than 10 characters.")
        .required("The version name is required."),
    }),

    onSubmit: (values) => {
      // console.log({ ...values, uuid });
      createVersion({ ...values, uuid }); // validates and creates
      props.nextStep();
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

      <input type="text" id="name" {...formik.getFieldProps("name")} />
      {renderFieldError("name")}
      <button type="submit" className="custom button-primary">
        Create Version
      </button>
    </StylizedForm>
  );
}
