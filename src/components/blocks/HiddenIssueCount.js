import "./HiddenIssueCount.scss";
import { useAppContext, useDiaryContext } from "../../AppContext";

export default function HiddenIssueCount(props) {
  const { context } = useAppContext();
  const { diaryContext } = useDiaryContext();

  console.log(diaryContext);

  if (
    context.loggedIn ||
    context.authenticatedDiaries.includes(diaryContext.targetDiary.uuid) ||
    diaryContext.counts.privateCount === 0
  ) {
    return null;
  }

  return (
    <div className="hidden-issue-count">
      <div>
        <h2>
          {diaryContext.counts.privateCount} Hidden Issue
          {diaryContext.counts.privateCount > 1 ? "s" : null}
        </h2>
        <p>
          To see private issues, please sign in or authenticate by clicking on
          the unlock icon in the shortcuts bar.
        </p>
      </div>
    </div>
  );
}
