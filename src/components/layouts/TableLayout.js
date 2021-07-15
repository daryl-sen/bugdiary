import "./TableLayout.scss";
import useIssueFunctions from "../../hooks/useIssueFunctions";
import HiddenIssueCount from "../blocks/HiddenIssueCount";
import { useAppContext, useDiaryContext } from "../../AppContext";

export default function TableLayout(props) {
  const { context } = useAppContext();
  const { diaryContext } = useDiaryContext();
  const { renderIssueContainers } = useIssueFunctions();

  return (
    <div className="table-view">
      {!context.loggedIn &&
        !context.authenticatedDiaries.includes(diaryContext.targetDiary.uuid) &&
        diaryContext.counts.privateCount !== 0 && (
          <HiddenIssueCount count={diaryContext.counts.privateCount} />
        )}
      {renderIssueContainers(props.issues)}
    </div>
  );
}
