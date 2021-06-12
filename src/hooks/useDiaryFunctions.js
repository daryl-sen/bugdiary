import { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../App";
import NotificationManager from "react-notifications/lib/NotificationManager";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function useDiaryFunctions() {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [diaryContent, setDiaryContent] = useState(null);
  const [diaryConfig, setDiaryConfig] = useState(null);

  const uInfo = useContext(UserContext);
  const history = useHistory();

  const createDiary = (diaryDetails) => {
    setLoadingStatus(true);
    const config = {
      headers: {
        authorization: `Bearer ${uInfo.jwt}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        BASE_URL + "/api/diaries/diary",
        { ...diaryDetails, user_id: uInfo.id },
        config
      )
      .then((resp) => {
        if (!resp.data.error) {
          NotificationManager.success("New diary created!");
          return history.push("/setup/" + resp.data.uuid);
        }
        console.log(resp.data.error);
        return resp.data;
      });
  };

  const getDiaryContent = (uuid) => {
    console.log("updating");

    const authorization = { headers: { authorization: `Bearer ${uInfo.jwt}` } };
    axios
      .get("/api/diaries/" + uuid, authorization)
      .then((resp) => {
        setDiaryContent(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const extendExpiry = async (uuid) => {
    const authorization = { headers: { authorization: `Bearer ${uInfo.jwt}` } };
    await axios
      .patch("/api/diaries/extend/" + uuid, {}, authorization)
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
    const authorization = { headers: { authorization: `Bearer ${uInfo.jwt}` } };

    await axios
      .patch("/api/diaries/diary", values, authorization)
      .then((resp) => {
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

  return {
    uInfo,
    loadingStatus,
    diaryContent,
    diaryConfig,
    setLoadingStatus,
    createDiary,
    getDiaryContent,
    getAssociatedDiaries,
    updateDiary,
    deleteDiary,
    setDiaryConfig,
    extendExpiry,
  };
}
