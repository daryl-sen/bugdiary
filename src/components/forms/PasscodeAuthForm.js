// form
import StylizedForm from "./StylizedForm";
import { useFormik } from "formik";

import useDiaryFunctions from "../../hooks/useDiaryFunctions";
import { useParams } from "react-router-dom";

export default function PasscodeAuthForm() {
  const uuid = useParams().uuid;
  const { authenticateWithPasscode } = useDiaryFunctions();
  const formik = useFormik({
    initialValues: {
      passcode: "",
    },
    onSubmit: async (values) => {
      console.log("authenticate", values);
      authenticateWithPasscode(values, uuid);
    },
  });

  return (
    <StylizedForm formik={formik}>
      <input
        id="passcode"
        name="passcode"
        type="password"
        autoComplete="off"
        {...formik.getFieldProps("passcode")}
      />
      <button type="submit" className="button-primary">
        Get Access
      </button>
    </StylizedForm>
  );
}
