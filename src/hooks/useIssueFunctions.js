import { useState } from "react";
import axios from "axios";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useAppContext, useDiaryContext } from "../AppContext";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function useIssueFunctions() {
  const { context } = useAppContext();
  const { setDiaryContext } = useDiaryContext();

  const [issueData, setIssueData] = useState(null);

  const headers = {
    headers: {
      authorization: `Bearer ${context.jwt}`,
      "Content-Type": "application/json",
    },
    withCredentials: true, // enables API to read req.session cookies
  };
  const getIssueSetupDetails = (uuid) => {
    axios
      .get(BASE_URL + "/api/diaries/issue-setup/" + uuid, headers)
      .then((resp) => {
        if (resp.data.error) {
          return false;
        }
        setIssueData(resp.data);
        return true;
      });
  };

  const createIssue = async (values) => {
    // create
    return await axios
      .post(BASE_URL + "/api/diaries/issues", values, headers)
      .then((resp) => {
        if (resp.data.error) {
          console.log(resp.data);
          return false;
        }
        setIssueData(resp.data);
        NotificationManager.success("New issue added!");
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

  const markIssue = (status, issueId) => {
    return axios
      .patch(BASE_URL + "/api/diaries/issues/" + issueId, { status }, headers)
      .then((resp) => {
        if (resp.data.error) {
          NotificationManager.error(
            `There was a problem marking this issue: ${resp.data.error}`
          );
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

  const searchIssues = (searchTerm, uuid, showResolved, showDeleted) => {
    return axios
      .get(BASE_URL + `/api/diaries/issues/${uuid}/search`, {
        params: {
          showResolved: showResolved ? 1 : 0,
          showDeleted: showDeleted ? 1 : 0,
          searchTerm,
        },
      })
      .then((resp) => {
        if (resp.data.error) {
          NotificationManager.error("Search error");
          return false;
        }
        setDiaryContext((prev) => {
          return { ...prev, issues: resp.data.issues };
        });
      });
  };

  return {
    context,
    issueData,
    createIssue,
    getIssueDetails,
    markIssue,
    deleteIssue,
    selectIssue,
    getIssueSetupDetails,
    searchIssues,
  };
}
