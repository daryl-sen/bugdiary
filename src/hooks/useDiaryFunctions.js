import { useState } from "react";
import axios from "axios";

import { useContext } from "react";
import { UserContext } from "../App";

export default function useDiaryFunctions() {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [diaryContent, setDiaryContent] = useState(null);
  const uInfo = useContext(UserContext);

  const createDiary = (diaryDetails) => {};

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
