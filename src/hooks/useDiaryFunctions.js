import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useAppContext } from "../AppContext";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function useDiaryFunctions() {
  const { context, setContext } = useAppContext();

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [diaryContent, setDiaryContent] = useState(null);
  const [diaryConfig, setDiaryConfig] = useState(null);
  const history = useHistory();

  const config = {
    headers: {
      authorization: `Bearer ${context.jwt}`,
      "Content-Type": "application/json",
    },
  };

  const createDiary = (diaryDetails) => {
    setLoadingStatus(true);
    axios.post(BASE_URL + "/api/diaries", diaryDetails, config).then((resp) => {
      if (!resp.data.error) {
        NotificationManager.success("New diary created!");
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

  const getDiaryContent = (uuid) => {
    console.log("updating");

    axios
      .get("/api/diaries/" + uuid, config)
      .then((resp) => {
        setDiaryContent(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const extendExpiry = async (uuid) => {
    await axios
      .patch("/api/diaries/extend/" + uuid, {}, config)
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
    await axios.patch("/api/diaries/" + uuid, values, config).then((resp) => {
      if (resp.data.error) {
        console.log(resp.data.error);
        NotificationManager.error("An error has occurred.");
        return false;
      }
      NotificationManager.success("Your diary has been updated!");
      return resp.data;
    });
  };

  const deleteDiary = () => {};

  const authenticateWithPasscode = (values, uuid) => {
    console.log("before", context);
    axios
      .post("/api/diaries/passcode-auth/" + uuid, values, config)
      .then((resp) => {
        if (resp.data.error) {
          NotificationManager.error("An error has occurred:", resp.data.error);
          return false;
        }
        setContext((prev) => {
          console.log(resp.data);
          console.log(prev);
          return {
            ...prev,
            authenticatedDiaries: [
              ...prev.authenticatedDiaries,
              resp.data.uuid,
            ],
          };
        });
        NotificationManager.success("You have been authenticated!");
      });
  };

  return {
    context,
    loadingStatus,
    diaryContent,
    diaryConfig,
    setLoadingStatus,
    createDiary,
    getDiaryContent,
    setDiaryContent,
    getAssociatedDiaries,
    updateDiary,
    deleteDiary,
    setDiaryConfig,
    extendExpiry,
    authenticateWithPasscode,
  };
}
