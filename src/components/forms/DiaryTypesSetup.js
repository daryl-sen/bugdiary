import { useParams } from "react-router";
import { useEffect, useState } from "react";
// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";

// custom hooks
import useDiarySetupFunctions from "../../hooks/useDiarySetupFunctions";

export default function DiaryTypesSetup(props) {
  const uuid = useParams().uuid;
  const [updated, setUpdated] = useState(false);

  const {
    diaryConfig,
    getTypes,
    createType,
    renderTags,
  } = useDiarySetupFunctions();

  useEffect(() => {
    getTypes(uuid);
  }, [updated]); // eslint-disable-line react-hooks/exhaustive-deps

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
      setUpdated((prev) => {
        return prev + 1;
      });
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
      <button
        type="button"
        className="custom button-primary"
        onClick={props.end}
        data-testid={"next-step"}
      >
        Go to Diary
      </button>
      <button type="button" onClick={props.prevStep} className="custom">
        Previous
      </button>
    </StylizedForm>
  );
}
