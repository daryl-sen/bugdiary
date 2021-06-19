import axios from "axios";
import { useEffect, useState } from "react";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";

import { useContext } from "react";
import { UserContext } from "../App";

import DiaryContainer from "../components/blocks/DiaryContainer";
import NewDiaryButton from "../components/elements/NewDiaryButton";

import LoadingIndicator from "../components/elements/LoadingIndicator";

import "./Diaries.scss";

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
        return (
          <DiaryContainer key={diary.id} {...diary}>
            {diary.description}
          </DiaryContainer>
        );
      });
    }
  };

  if (diaries === null) {
    return <LoadingIndicator />;
  }

  return (
    <SingleColumnLayout
      styleOverride={{
        textAlign: "center",
      }}
    >
      <h1>My Bug Diaries</h1>
      <div className="diaries-container">
        {renderDiaries()}
        <NewDiaryButton />
      </div>
    </SingleColumnLayout>
  );
}
