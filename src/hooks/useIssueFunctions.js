import { useState } from "react";
import axios from "axios";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useAppContext, useDiaryContext } from "../AppContext";

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
    axios.get("/api/diaries/issue-setup/" + uuid, headers).then((resp) => {
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
      .post("/api/diaries/issues", values, headers)
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

  const markIssue = (status_id, issueId) => {
    return axios
      .patch("/api/diaries/issues/" + issueId, { status_id }, headers)
      .then((resp) => {
        if (resp.data.error) {
          NotificationManager.error(
            `There was a problem marking this issue: ${resp.data.error}`
          );
          console.log(resp.data.error);
          return false;
        }
        NotificationManager.success(`Issue status updated.`);
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
      .get(`/api/diaries/issues/${uuid}/search`, {
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
