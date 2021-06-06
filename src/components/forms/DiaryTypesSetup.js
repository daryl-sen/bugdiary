import { Link } from "react-router-dom";
import LoadingIndicator from "../elements/LoadingIndicator";
import { useParams } from "react-router";
import { useEffect } from "react";
// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";

// custom hooks
import useDiarySetupFunctions from "../../hooks/useDiarySetupFunctions";

export default function DiaryTypesSetup(props) {
  const uuid = useParams().uuid;

  const {
    diaryConfig,
    getTypes,
    createType,
    renderTags,
  } = useDiarySetupFunctions();

  useEffect(() => {
    getTypes(uuid);
  }, [diaryConfig]);

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(10, "Version name must be less than 10 characters.")
        .required("The type name is required."),
    }),

    onSubmit: async (values) => {
      // console.log({ ...values, uuid });

      await createType({ ...values, uuid });
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
      {renderTags(diaryConfig)}
      <p>
        Your project might encounter different types of issues. Create some
        options for your users to choose from.
      </p>

      <input type="text" id="name" {...formik.getFieldProps("name")} />
      {renderFieldError("name")}
      <button type="submit" className="custom">
        Create Type
      </button>
      <hr />
      <p>That's it!</p>
      <Link to={"/diary/" + uuid}>
        <button type="button" className="custom button-primary">
          Go to Diary
        </button>
      </Link>
    </StylizedForm>
  );
}
