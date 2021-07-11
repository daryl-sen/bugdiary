import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useAppContext, useDiaryContext } from "../AppContext";

// axios.interceptors.request.use((request) => {
//   console.log("Starting Request", JSON.stringify(request, null, 2));
//   return request;
// });

export default function useDiaryFunctions() {
  const { context, setContext } = useAppContext();
  const { setDiaryContext, resetDiaryContext } = useDiaryContext();

  const [loadingStatus, setLoadingStatus] = useState(false);
  const history = useHistory();

  const headers = {
    headers: {
      authorization: `Bearer ${context.jwt}`,
      "Content-Type": "application/json",
    },
    withCredentials: true, // enables API to read req.session cookies
  };

  const createDiary = (diaryDetails) => {
    setLoadingStatus(true);
    axios.post("/api/diaries", diaryDetails, headers).then((resp) => {
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

  const getDiaryContent = (uuid, showResolved, showDeleted, callback) => {
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
        if (callback) callback(resp.data.targetDiary);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const extendExpiry = async (uuid) => {
    await axios
      .patch("/api/diaries/extend/" + uuid, {}, headers)
      .then((resp) => {
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

  const deleteDiary = (uuid) => {
    return axios.delete("/api/diaries/" + uuid, headers).then((resp) => {
      if (resp.data.error) {
        NotificationManager.error("Cannot delete diary", resp.data.error);
        return false;
      }
      NotificationManager.success("Deleted diary.");
      resetDiaryContext();
      history.push("/");
      return true;
    });
  };

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

  const transferOwnership = async (uuid, newOwnerId) => {
    await axios
      .patch(
        "/api/diaries/" + uuid,
        {
          user_id: newOwnerId,
        },
        headers
      )
      .then((resp) => {
        if (resp.data.error) {
          console.log(resp.data.error);
          NotificationManager.error(
            "Could not claim this diary",
            resp.data.error
          );
          return false;
        }
        setDiaryContext((prev) => {
          return { ...prev, targetDiary: resp.data };
        });
        NotificationManager.success("You have claimed this diary!");
        return resp.data;
      });
  };

  const updateAlias = async (alias, uuid) => {
    await axios
      .patch("/api/diaries/" + uuid, { alias }, headers)
      .then((resp) => {
        if (resp.data.error) {
          console.log(resp.data.error);
          NotificationManager.error(
            `An error has occurred: ${resp.data.error}`
          );
          return false;
        }
        setDiaryContext((prev) => {
          return { ...prev, targetDiary: resp.data };
        });
        NotificationManager.success("Your diary alias been updated!");
        return resp.data;
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
    transferOwnership,
    updateAlias,
  };
}
