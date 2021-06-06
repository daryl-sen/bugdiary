import { useParams } from "react-router";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import MasonryContainer from "../components/layout/MasonryLayout";

import LoadingIndicator from "../components/elements/LoadingIndicator";
import useDiaryFunctions from "../hooks/useDiaryFunctions";

export default function Diary(props) {
  const { uuid } = useParams();

  const { diaryContent, getDiaryContent } = useDiaryFunctions();

  getDiaryContent(uuid);

  if (!diaryContent) {
    return <LoadingIndicator />;
  }

  const { targetDiary, issues } = diaryContent;

  return (
    <SingleColumnLayout
      styleOverride={{
        textAlign: "center",
      }}
    >
      <h1>{targetDiary.name}</h1>
      Diary uuid: {uuid}
      <MasonryContainer issues={issues} />
    </SingleColumnLayout>
  );
}
