import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useAppContext, useDiaryContext } from "../AppContext";

const BASE_URL = process.env.REACT_APP_API_URL;

// axios.interceptors.request.use((request) => {
//   console.log("Starting Request", JSON.stringify(request, null, 2));
//   return request;
// });

export default function useDiaryFunctions() {
  const { context, setContext } = useAppContext();
  const { setDiaryContext } = useDiaryContext();

  const [loadingStatus, setLoadingStatus] = useState(false);
  const history = useHistory();

  const headers = {
    headers: {
      authorization: `Bearer ${context.jwt}`,
      "Content-Type": "application/json",
    },
  };

  const createDiary = (diaryDetails) => {
    setLoadingStatus(true);
    axios
      .post(BASE_URL + "/api/diaries", diaryDetails, headers)
      .then((resp) => {
        if (!resp.data.error) {
          NotificationManager.success("New diary created!");
          // add to list of authenticated diaries
          setContext((prev) => {
            return {
              ...prev,
              authenticatedDiaries: [
                ...prev.authenticatedDiaries,
                resp.data.uuid,
              ],
            };
          });
          return history.push("/setup/" + resp.data.uuid);
        }
        console.log(resp.data.error);
        return resp.data;
      });
  };

  const getDiaryContent = (uuid, showResolved, showDeleted) => {
    console.log("updating");
    axios
      .get(
        "/api/diaries/" + uuid,
        {
          params: {
            showResolved: showResolved ? 1 : 0,
            showDeleted: showDeleted ? 1 : 0,
          },
        },
        headers
      )
      .then((resp) => {
        if (resp.data.error) {
          setDiaryContext((prev) => {
            return {
              ...prev,
              targetDiary: null,
            };
          });
        }
        setDiaryContext((prev) => {
          return {
            ...prev,
            targetDiary: resp.data.targetDiary,
            issues: resp.data.issues,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const extendExpiry = async (uuid) => {
    await axios
      .patch("/api/diaries/extend/" + uuid, {}, headers)
      .then((resp) => {
        console.log(resp.data);
        if (resp.error) {
          return false;
        }
        return true;
      });
  };

  const getAssociatedDiaries = () => {};

  const updateDiary = async (uuid, values) => {
    await axios.patch("/api/diaries/" + uuid, values, headers).then((resp) => {
      if (resp.data.error) {
        console.log(resp.data.error);
        NotificationManager.error(`An error has occurred: ${resp.data.error}`);
        return false;
      }
      setDiaryContext((prev) => {
        return { ...prev, targetDiary: resp.data };
      });
      NotificationManager.success("Your diary has been updated!");
      return resp.data;
    });
  };

  const deleteDiary = () => {};

  const authenticateWithPasscode = (values, uuid) => {
    return axios
      .post("/api/diaries/passcode-auth/" + uuid, values, headers)
      .then((resp) => {
        if (resp.data.error) {
          NotificationManager.error("An error has occurred:", resp.data.error);
          return false;
        }
        setContext((prev) => {
          return {
            ...prev,
            authenticatedDiaries: [
              ...prev.authenticatedDiaries,
              resp.data.uuid,
            ],
          };
        });
        NotificationManager.success("You have been authenticated!");
        return true;
      });
  };

  return {
    context,
    loadingStatus,
    setLoadingStatus,
    createDiary,
    getDiaryContent,
    getAssociatedDiaries,
    updateDiary,
    deleteDiary,
    extendExpiry,
    authenticateWithPasscode,
  };
}
