import { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../App";
import NotificationManager from "react-notifications/lib/NotificationManager";

import IssueTag from "../components/elements/IssueTag";

const BASE_URL = "http://localhost:3000";

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
        { ...diaryDetails, user_id: 1 },
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

  const getVersions = (uuid) => {
    const headers = {
      headers: {
        authorization: `Bearer ${uInfo.jwt}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(process.env.REACT_APP_API_URL + "/api/versions/" + uuid, headers)
      .then((resp) => {
        setDiaryConfig(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // helpers
  const renderTags = (tags) => {
    if (Array.isArray(tags)) {
      return tags.map((tag) => {
        return <IssueTag key={tag.id}>{tag.name}</IssueTag>;
      });
    }
  };

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
    getVersions,
    renderTags,
  };
}
