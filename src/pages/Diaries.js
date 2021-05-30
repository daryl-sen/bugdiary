import axios from "axios";
import { useEffect, useState } from "react";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";

import { useContext } from "react";
import { UserContext } from "../App";

export default function Diaries() {
  const [diaries, setDiaries] = useState(null);
  const uinfo = useContext(UserContext);

  useEffect(() => {
    const authorization = { headers: { authorization: `Bearer ${uinfo.jwt}` } };
    axios
      .get("/api/diaries/", authorization)
      .then((resp) => {
        // console.log(resp.data);
        setDiaries(resp.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [uinfo.jwt]);

  const renderDiaries = () => {
    if (diaries) {
      return diaries.map((diary) => {
        return <div key={diary.id}>{diary.description}</div>;
      });
    }
  };

  return (
    <SingleColumnLayout>
      <h1>My Bug Diaries</h1>
      {renderDiaries()}
    </SingleColumnLayout>
  );
}
