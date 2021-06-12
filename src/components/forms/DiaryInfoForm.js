import { Link } from "react-router-dom";
// import LoadingIndicator from "../elements/LoadingIndicator";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";

// custom hooks
import useDiaryFunctions from "../../hooks/useDiaryFunctions";

export default function DiaryInfoForm(props) {
  const { updateDiary } = useDiaryFunctions();
  const [privacyMode, setPrivacyMode] = useState();

  useEffect(() => {
    setPrivacyMode(props.targetDiary.privacy);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: props.targetDiary.name,
      description: props.targetDiary.description,
      passcode: "",
      privacy: props.targetDiary.privacy,
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(10, "Version name must be less than 10 characters.")
        .required("The type name is required."),
    }),

    onSubmit: async (values) => {
      updateDiary(props.targetDiary.id, {
        ...values,
        uuid: props.targetDiary.uuid,
        passcode: values.passcode || undefined,
      });
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
      <label htmlFor="name">Diary Name</label>
      <input type="text" id="name" {...formik.getFieldProps("name")} />
      {renderFieldError("name")}

      <label htmlFor="description">Diary Description</label>
      <textarea
        id="desciption"
        {...formik.getFieldProps("description")}
      ></textarea>
      {renderFieldError("description")}

      <label htmlFor="passcode">Diary Passcode</label>
      <input
        type="password"
        id="passcode"
        {...formik.getFieldProps("passcode")}
      />
      {renderFieldError("passcode")}

      <h3>Diary Privacy</h3>
      <select
        id="privacy"
        {...formik.getFieldProps("privacy")}
        onChange={(e) => {
          console.log("changing");
          setPrivacyMode(e.target.value);
        }}
      >
        <option value="defaultPublic">Default to Public</option>
        <option value="defaultPrivate">Default to Private</option>
        <option value="enforcePrivate">Enforce Private</option>
      </select>
      {privacyMode}
      {privacyMode === "defaultPublic" && (
        <p>
          Users have to check a box to make their report private. Only the
          diary's owner or users with the diary's passcode can see private
          issues.
        </p>
      )}
      {privacyMode === "defaultPrivate" && (
        <p>
          Users have to uncheck a box to make their report public. Only the
          diary's owner or users with the diary's passcode can see private
          issues.
        </p>
      )}
      {privacyMode === "enforcePrivate" && (
        <p>
          Users will not see an option when reporting an issue. All issues are
          private (regardless of their previous configuration) and can only be
          viewed by the diary's owner or somebody who has the passcode.
        </p>
      )}

      <button type="submit" className="button-primary">
        Update
      </button>
    </StylizedForm>
  );
}
