import { useParams } from "react-router-dom";
import LoadingIndicator from "../blocks/LoadingIndicator";

// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";

// custom hooks
import useIssueFunctions from "../../hooks/useIssueFunctions";
import { useEffect, useState } from "react";

import TwoColumnLayout from "../layouts/TwoColumnLayout";
import WhiteBgContainer from "../blocks/WhiteBgContainer";
import { useAppContext, useDiaryContext } from "../../AppContext";

import NewIssueSidebar from "../sidebars/NewIssueSidebar";
import useDiaryFunctions from "../../hooks/useDiaryFunctions";

export default function NewIssueForm(props) {
  const { diaryContext, setDiaryContext } = useDiaryContext();
  const { context } = useAppContext();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const uuid = useParams().uuid;
  const { updateIssueCounts } = useDiaryFunctions();
  const { issueData, getIssueSetupDetails, createIssue } = useIssueFunctions();

  const formik = useFormik({
    initialValues: {
      reference: "",
      details: "",
      reporter_name: context.userDetails.display_name || "",
      reporter_email: "",
      type_name: "",
      location_name: "",
      private:
        diaryContext.targetDiary.privacy === "defaultPrivate" ||
        diaryContext.targetDiary.privacy === "enforcePrivate"
          ? true
          : false,
    },

    validationSchema: Yup.object({
      reference: Yup.string().max(
        20,
        "Please keep your reference heading less than 20 characters."
      ),
      details: Yup.string()
        .max(500, "Please keep the issue details less than 500 characters.")
        .required("Please fill out the issue details."),
      reporter_name: Yup.string().max(
        20,
        "Please keep your name under 20 characters."
      ),
      reporter_email: Yup.string().email(
        "The email address you provided is invalid."
      ),
      type_name: Yup.string().required("Please type or select an issue type."),
      location_name: Yup.string().required(
        "Please type or select an issue location."
      ),
    }),

    onSubmit: async (values) => {
      setLoadingStatus(true);
      const newIssue = await createIssue({
        ...values,
        diary_id: targetDiary.id,
        version_id: latestVersion[0].id,
        private: values.private ? 1 : 0,
      });
      setDiaryContext((prev) => {
        return { ...prev, mode: "show", issues: [newIssue, ...prev.issues] };
      });
      updateIssueCounts(uuid);
    },
  });

  useEffect(() => {
    getIssueSetupDetails(uuid);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!issueData) {
    return <LoadingIndicator />;
  }

  const { targetDiary, diaryLocations, diaryTypes, latestVersion } = issueData;

  const renderFieldError = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return <div className="form-error">{formik.errors[fieldName]}</div>;
    }
  };

  const renderSuggestions = (datalist) => {
    if (Array.isArray(datalist)) {
      return datalist.map((suggestion) => {
        return <option key={suggestion.id} value={suggestion.name}></option>;
      });
    }
  };

  return (
    <TwoColumnLayout preset={"confined"} aside={<NewIssueSidebar />}>
      {loadingStatus && <LoadingIndicator />}
      <WhiteBgContainer>
        <h2>Report New Issue</h2>
        <StylizedForm formik={formik}>
          <label htmlFor="reference">Heading</label>
          <input
            id="reference"
            type="text"
            {...formik.getFieldProps("reference")}
            placeholder="(Optional)"
          />
          {renderFieldError("reference")}

          <label htmlFor="location_name">Location</label>
          <datalist id="location_suggestions">
            {renderSuggestions(diaryLocations)}
          </datalist>
          <input
            id="location_name"
            type="text"
            {...formik.getFieldProps("location_name")}
            placeholder="Where did you find it?"
            list="location_suggestions"
          />
          {renderFieldError("location_name")}

          <label htmlFor="type_name">Type</label>
          <input
            id="type_name"
            type="text"
            {...formik.getFieldProps("type_name")}
            placeholder="What kind of issue is it?"
            list="type_suggestions"
          />
          <datalist id="type_suggestions">
            {renderSuggestions(diaryTypes)}
          </datalist>
          {renderFieldError("type_name")}

          <label htmlFor="details">Issue Details</label>
          <textarea
            id="details"
            {...formik.getFieldProps("details")}
          ></textarea>
          {renderFieldError("details")}

          <label htmlFor="reporter_name">Contact Name</label>
          <input
            id="reporter_name"
            type="text"
            {...formik.getFieldProps("reporter_name")}
            placeholder="(Optional)"
          />
          {renderFieldError("reporter_name")}

          <label htmlFor="reporter_email">Contact Email</label>
          <input
            id="reporter_email"
            type="email"
            {...formik.getFieldProps("reporter_email")}
            placeholder="(Optional)"
          />
          {renderFieldError("reporter_email")}

          <label htmlFor="private">
            <input
              name="private"
              id="private"
              type="checkbox"
              {...formik.getFieldProps("private")}
              checked={formik.values.private}
              disabled={
                diaryContext.targetDiary.privacy === "enforcePrivate" && true
              }
            />
            Make this private
          </label>
          {renderFieldError("private")}
          <button
            type="submit"
            className="button-primary"
            data-testid={"new-issue-button"}
          >
            Report Issue
          </button>
        </StylizedForm>
        <button
          type="button"
          className="custom button-secondary"
          onClick={() => {
            setDiaryContext((prev) => {
              return { ...prev, mode: "show" };
            });
          }}
        >
          Cancel
        </button>
      </WhiteBgContainer>
    </TwoColumnLayout>
  );
}
