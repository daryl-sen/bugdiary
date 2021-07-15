import "./MasonryLayout.scss";
import Masonry from "react-masonry-css";
import useIssueFunctions from "../../hooks/useIssueFunctions";
import HiddenIssueCount from "../blocks/HiddenIssueCount";

export default function MasonryLayout(props) {
  const { renderIssueContainers } = useIssueFunctions();

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
      <HiddenIssueCount />
      {renderIssueContainers(props.issues)}
    </Masonry>
  );
}
