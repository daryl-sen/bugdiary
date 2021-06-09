import { useState } from "react";
import axios from "axios";

import { useContext } from "react";
import { UserContext } from "../App";
import NotificationManager from "react-notifications/lib/NotificationManager";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function useIssueFunctions() {
  // const [selectedIssues, setSelectedIssues] = useState(null); // for selecting multiple issues
  const [issueData, setIssueData] = useState(null);
  // const [loadingStatus, setLoadingStatus] = useState(false);

  const uInfo = useContext(UserContext);

  const headers = {
    headers: {
      authorization: `Bearer ${uInfo.jwt}`,
      "Content-Type": "application/json",
    },
  };
  const getIssueSetupDetails = (uuid) => {
    axios
      .get(BASE_URL + "/api/diaries/issue-setup/" + uuid, headers)
      .then((resp) => {
        if (resp.data.error) {
          console.log("useIssueFunction Error" + resp.data.error);
          return false;
        }
        setIssueData(resp.data);
        return true;
      });
  };

  const createIssue = async (values) => {
    // create
    await axios
      .post(BASE_URL + "/api/issues/", values, headers)
      .then((resp) => {
        if (resp.data.error) {
          console.log(resp.data);
          return false;
        }
        setIssueData(resp.data);
        NotificationManager.success("New issue added!");
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const getIssueDetails = () => {
    // read
  };

  const markIssue = async (status, issueId) => {
    await axios
      .patch(BASE_URL + "/api/issues/" + issueId, { status }, headers)
      .then((resp) => {
        if (resp.data.error) {
          console.log(resp.data.error);
          return false;
        }
        NotificationManager.success(`The issue is marked as '${status}'.`);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const deleteIssue = () => {
    // delete
  };

  const selectIssue = () => {
    // push to selectedIssues
  };

  return {
    uInfo,
    issueData,
    createIssue,
    getIssueDetails,
    markIssue,
    deleteIssue,
    selectIssue,
    getIssueSetupDetails,
  };
}
