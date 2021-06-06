import { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../App";
import NotificationManager from "react-notifications/lib/NotificationManager";

const BASE_URL = "http://localhost:3000";

export default function useDiaryFunctions() {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [diaryContent, setDiaryContent] = useState(null);
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
        { ...diaryDetails, user_id: 1 },
        config
      )
      .then((resp) => {
        if (!resp.data.error) {
          NotificationManager.success("New diary created!");
          return history.push("/diary/" + resp.data.uuid);
        }
        console.log(resp.data.error);
        return resp.data;
      });
  };

  const getDiaryContent = (uuid) => {
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

  const getAssociatedDiaries = () => {};
  const updateDiary = () => {};
  const deleteDiary = () => {};

  return {
    loadingStatus,
    diaryContent,
    setLoadingStatus,
    createDiary,
    getDiaryContent,
    getAssociatedDiaries,
    updateDiary,
    deleteDiary,
  };
}