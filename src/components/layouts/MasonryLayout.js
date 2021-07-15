import "./MasonryLayout.scss";
import Masonry from "react-masonry-css";
import useIssueFunctions from "../../hooks/useIssueFunctions";
import HiddenIssueCount from "../blocks/HiddenIssueCount";
import { useAppContext, useDiaryContext } from "../../AppContext";


export default function MasonryLayout(props) {
  const { renderIssueContainers } = useIssueFunctions();
  const { context } = useAppContext();
  const { diaryContext } = useDiaryContext();

  return (
    <Masonry
      breakpointCols={{
        default: 4,
        1500: 4,
        1350: 3,
        1100: 2,
        800: 1,
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {(
    !context.loggedIn &&
    !context.authenticatedDiaries.includes(diaryContext.targetDiary.uuid) &&
    diaryContext.counts.privateCount !== 0
  ) && <HiddenIssueCount count={diaryContext.counts.privateCount} />}
      {renderIssueContainers(props.issues)}
    </Masonry>
  );
}
