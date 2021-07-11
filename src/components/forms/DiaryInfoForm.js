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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formik = useFormik({
    initialValues: {
      name: props.targetDiary.name,
      description: props.targetDiary.description,
      passcode: "",
      privacy: privacyMode,
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Version name must be less than 20 characters.")
        .required("The type name is required."),
    }),

    onSubmit: async (values) => {
      await updateDiary(props.targetDiary.uuid, {
        ...values,
        uuid: props.targetDiary.uuid,
        passcode: values.passcode || undefined,
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
      <h2>Update Diary Info</h2>
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
        autoComplete="off"
        placeholder="Leave empty if no change needed"
        {...formik.getFieldProps("passcode")}
      />
      {renderFieldError("passcode")}

      <h3>Diary Privacy</h3>
      <select
        id="privacy"
        {...formik.getFieldProps("privacy")}
        onChange={(e) => {
          formik.handleChange("privacy")(e);
          setPrivacyMode(e.target.value);
        }}
        value={privacyMode}
      >
        <option value="defaultPublic">Default to Public</option>
        <option value="defaultPrivate">Default to Private</option>
        <option value="enforcePrivate">Enforce Private</option>
      </select>
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
          All new issues are private and can only be viewed by the diary's owner or
          somebody who has the passcode. There is no option to change the issue's privacy settings on creation.
        </p>
      )}

      <button type="submit" className="button-primary">
        Update
      </button>
    </StylizedForm>
  );
}
