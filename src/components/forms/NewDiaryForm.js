import { Link } from "react-router-dom";
import LoadingIndicator from "../blocks/LoadingIndicator";

// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";

// custom hooks
import useDiaryFunctions from "../../hooks/useDiaryFunctions";

export default function NewDiaryForm(props) {
  const { loadingStatus, createDiary } = useDiaryFunctions();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      passcode: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Please keep your diary name less than 30 characters.")
        .required("Please give your diary a name so you can find it later."),
      description: Yup.string().max(
        200,
        "Please keep your diary description short and sweet."
      ),
      passcode: Yup.string().max(
        20,
        "Please keep your passcode below 20 characters."
      ),
    }),

    onSubmit: (values) => {
      createDiary(values);
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

      <label htmlFor="name">Diary Name</label>
      <input type="text" id="name" {...formik.getFieldProps("name")} />
      {renderFieldError("name")}

      <label htmlFor="description">Diary Description</label>
      <input
        id="description"
        type="text"
        {...formik.getFieldProps("description")}
        placeholder="Optional"
      />
      {renderFieldError("description")}

      <label htmlFor="passcode">Diary Passcode</label>
      <input
        id="passcode"
        type="password"
        {...formik.getFieldProps("passcode")}
        placeholder="Optional"
        autoComplete="off"
      />
      {renderFieldError("passcode")}

      <button
        type="submit"
        className="button-primary"
        data-testid={"create-diary-button"}
      >
        Create Diary
      </button>
      <Link to="/diaries">
        <button type="button" className="custom button-secondary">
          Cancel
        </button>
      </Link>
    </StylizedForm>
  );
}
