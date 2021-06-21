import { useParams } from "react-router";
import useDiaryFunctions from "../../hooks/useDiaryFunctions";
import { useDiaryContext, useAppContext } from "../../AppContext";
import { useEffect } from "react";

import LoadingIndicator from "../blocks/LoadingIndicator";
import SingleColumnLayout from "../layouts/SingleColumnLayout";
import ShortcutNavigation from "../blocks/ShortcutNavigation";
// import TwoColumnLayout from "../layouts/TwoColumnLayout";
// import TableLayout from "../layouts/TableLayout";
// import MasonryContainer from "../layouts/MasonryLayout";
// import WhiteBgContainer from "../blocks/WhiteBgContainer";
// import NewIssueForm from "../forms/NewIssueForm";
// import DiaryInfoSettings from "../overlays/DiaryInfoSettings";

import NoDiaryFound from "../functional/NoDiaryFound";

export default function Diary(props) {
  const { uuid } = useParams();
  const { context, setContext } = useAppContext();
  const { diaryContext, setDiaryContext } = useDiaryContext();
  const { getDiaryContent, setDiaryContent } = useDiaryFunctions();

  useEffect(() => {
    getDiaryContent(uuid);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(context, diaryContext);

  if (diaryContext.targetDiary === undefined) {
    return <LoadingIndicator />;
  } else if (diaryContext.targetDiary === null) {
    return <NoDiaryFound />;
  }

  const { targetDiary, issues } = diaryContext;

  return (
    <>
      <SingleColumnLayout preset="centered">
        <h1>{targetDiary.name}</h1>
        <ShortcutNavigation />

        {/* {diaryContext.mode === "show" &&
          diaryContext.config.displayType === "cards" && <MasonryContainer />}
        {diaryContext.mode === "show" &&
          diaryContext.config.displayType === "table" && <TableLayout />}
        {diaryContext.mode === "add" && (
          <TwoColumnLayout preset={"confined"} aside="addSidebar">
            <WhiteBgContainer>
              <h2>Report New Issue</h2>
              <NewIssueForm exit={() => {}} refresh={() => {}} />
              <button
                type="button"
                className="custom button-secondary"
                onClick={() => {}}
              >
                Cancel
              </button>
            </WhiteBgContainer>
          </TwoColumnLayout>
        )}
        {diaryContext.mode === "diaryInfo" && <DiaryInfoSettings />} */}
      </SingleColumnLayout>
    </>
  );
}
