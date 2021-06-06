import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import LoadingIndicator from "../elements/LoadingIndicator";

// context
import { useContext, useState } from "react";
import { UserContext } from "../../App";

// notifications
import { NotificationManager } from "react-notifications";

// form
import StylizedForm from "./StylizedForm";
import { useFormik } from "formik";

export default function NewDiaryForm(props) {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const history = useHistory();
  const uinfo = useContext(UserContext);

  return <></>;
}
