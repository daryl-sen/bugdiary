// form
import StylizedForm from "./StylizedForm";
import * as Yup from "yup";
import { useFormik } from "formik";

import useDiarySetupFunctions from "../../hooks/useDiarySetupFunctions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DiaryLocationSetup(props) {
  const [updated, setUpdated] = useState(false);

  const {
    diaryConfig,
    getLocations,
    createLocation,
    renderTags,
  } = useDiarySetupFunctions();
  const uuid = useParams().uuid;

  useEffect(() => {
    getLocations(uuid);
  }, [updated]); // eslint-disable-line react-hooks/exhaustive-deps

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().max(
        10,
        "Location name must be less than 10 characters."
      ),
    }),

    onSubmit: async (values) => {
      await createLocation({ ...values, uuid });
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
      <h2>Locations</h2>
      {renderTags(diaryConfig)}
      <p>
        Issues can occur at different locations. List a few for users to pick.
        (Optional)
      </p>

      <input type="text" id="name" {...formik.getFieldProps("name")} />
      {renderFieldError("name")}
      <button type="submit" className="custom">
        Create Location
      </button>
      <hr />
      <p>Almost there!</p>
      <button
        type="button"
        onClick={props.nextStep}
        className="custom button-primary"
        data-testid={"next-step"}
      >
        Next Step
      </button>
      <button type="button" onClick={props.prevStep} className="custom">
        Previous
      </button>
    </StylizedForm>
  );
}
