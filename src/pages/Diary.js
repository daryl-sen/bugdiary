import { useParams } from "react-router";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import MasonryContainer from "../components/layout/MasonryLayout";
import NavigationButton from "../components/elements/NavigationButton";
import LoadingIndicator from "../components/elements/LoadingIndicator";
import useDiaryFunctions from "../hooks/useDiaryFunctions";
import { useEffect } from "react";

export default function Diary(props) {
  const { uuid } = useParams();

  const { diaryContent, getDiaryContent } = useDiaryFunctions();

  useEffect(() => {
    getDiaryContent(uuid);
  }, [uuid]);

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
      <NavigationButton>Share Link</NavigationButton>
      <MasonryContainer issues={issues} />
    </SingleColumnLayout>
  );
}
