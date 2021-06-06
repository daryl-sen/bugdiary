import { useState } from "react";
import axios from "axios";

import { useContext } from "react";
import { UserContext } from "../App";
import NotificationManager from "react-notifications/lib/NotificationManager";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function useIssueFunctions() {
  // const [selectedIssues, setSelectedIssues] = useState(null); // for selecting multiple issues

  const uInfo = useContext(UserContext);

  const createIssue = (values) => {
    // create
    axios
      .post(BASE_URL + "/api/issues/")
      .then((resp) => {
        if (resp.data.error) {
          console.log(resp.data);
          return false;
        }
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const getIssueDetails = () => {
    // read
  };

  const markIssue = () => {
    // update
  };

  const deleteIssue = () => {
    // delete
  };

  const selectIssue = () => {
    // push to selectedIssues
  };

  return {
    uInfo,
    getIssueDetails,
    markIssue,
    deleteIssue,
    selectIssue,
  };
}
