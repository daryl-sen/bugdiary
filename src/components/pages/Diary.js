import { useParams } from "react-router";
import useDiaryFunctions from "../../hooks/useDiaryFunctions";
import { useDiaryContext } from "../../AppContext";
import { useEffect } from "react";

import LoadingIndicator from "../blocks/LoadingIndicator";
import SingleColumnLayout from "../layouts/SingleColumnLayout";
import ShortcutNavigation from "../blocks/ShortcutNavigation";
import TableLayout from "../layouts/TableLayout";
import MasonryContainer from "../layouts/MasonryLayout";
import NewIssueForm from "../forms/NewIssueForm";
import DiaryInfoSettings from "../overlays/DiaryInfoSettings";
import ScrollToTop from "../elements/ScrollToTop";
import DiarySettingsIndex from "../functional/DiarySettingsIndex";
import DiarySetupProcess from "../functional/DiarySetupProcess";
import NoDiaryFound from "../functional/NoDiaryFound";
import IssueSearchBox from "../overlays/IssueSearchBox";
import PasscodePrompt from "../overlays/PasscodePrompt";

export default function Diary(props) {
  const { uuid } = useParams();
  const {
    diaryContext,
    setDiaryContext,
    resetDiaryContext,
  } = useDiaryContext();
  const { getDiaryContent } = useDiaryFunctions();

  useEffect(() => {
    console.log("reset");
    resetDiaryContext();
    getDiaryContent(uuid, false, false, (targetDiary) => {
      // add current diary to recent diaries
      const currentDiary = [targetDiary.name, targetDiary.uuid];

      const storedRecentDiaries = localStorage.getItem("recentDiaries");
      if (storedRecentDiaries) {
        if (!storedRecentDiaries.includes(targetDiary.uuid)) {
          const recentDiaries = JSON.parse(storedRecentDiaries);
          recentDiaries.push(currentDiary);
          localStorage.recentDiaries = JSON.stringify(recentDiaries);
        }
      } else {
        localStorage.recentDiaries = JSON.stringify([currentDiary]);
      }
    });
  }, [uuid]); // eslint-disable-line react-hooks/exhaustive-deps

  if (diaryContext.targetDiary === undefined) {
    return <LoadingIndicator />;
  } else if (diaryContext.targetDiary === null) {
    return <NoDiaryFound />;
  }

  const { targetDiary, issues } = diaryContext;

  return (
    <>
      <SingleColumnLayout preset="centered">
        <ScrollToTop />
        <h1>{targetDiary.name}</h1>
        <ShortcutNavigation />

        {diaryContext.mode === "show" &&
          diaryContext.config.displayType === "cards" && (
            <MasonryContainer issues={issues} />
          )}

        {diaryContext.mode === "show" &&
          diaryContext.config.displayType === "table" && (
            <TableLayout issues={issues} />
          )}

        {diaryContext.mode === "add" && <NewIssueForm />}

        {diaryContext.mode === "diarySettings" && (
          <DiarySettingsIndex targetDiary={targetDiary} />
        )}

        {diaryContext.mode === "diaryModification" && (
          <DiaryInfoSettings targetDiary={targetDiary} />
        )}

        {diaryContext.mode === "diarySetup" && (
          <DiarySetupProcess initiated={true} />
        )}

        {diaryContext.mode === "filter" && <IssueSearchBox />}

        {diaryContext.mode === "passcodePrompt" && (
          <PasscodePrompt
            exit={(target) => {
              getDiaryContent(uuid);
              setDiaryContext((prev) => {
                return { ...prev, mode: target };
              });
            }}
          />
        )}
      </SingleColumnLayout>
    </>
  );
}
