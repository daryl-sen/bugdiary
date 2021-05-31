import { useParams } from "react-router";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import useDiaryData from "../hooks/useDiaryData";
import LoadingIndicator from "../components/LoadingIndicator";
import IssueContainer from "../components/IssueContainer";
import MasonryContainer from "../components/layout/MasonryLayout";

export default function Diary(props) {
  const { uuid } = useParams();

  const diaryData = useDiaryData(uuid);

  if (!diaryData) {
    return <LoadingIndicator />;
  }

  const { targetDiary, issues } = diaryData;

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
