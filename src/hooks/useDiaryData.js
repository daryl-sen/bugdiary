import axios from "axios";
import { useEffect, useState } from "react";

import { useContext } from "react";
import { UserContext } from "../App";

export default function useDiaryData(uuid) {
  const [diaryData, setDiaryData] = useState(null);
  const uinfo = useContext(UserContext);

  useEffect(() => {
    const authorization = { headers: { authorization: `Bearer ${uinfo.jwt}` } };
    axios
      .get("/api/diaries/" + uuid, authorization)
      .then((resp) => {
        setDiaryData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uuid, uinfo.jwt]);

  return diaryData;
}
