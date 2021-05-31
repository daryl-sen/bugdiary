import "./MasonryLayout.scss";
import Masonry from "react-masonry-css";
import IssueContainer from "../IssueContainer";

export default function MasonryLayout(props) {
  const renderIssueContainers = (issues) => {
    if (!Array.isArray(issues)) {
      return "none";
    }
    return issues.map((issue) => {
      return <IssueContainer key={issue.id} {...issue} />;
    });
  };

  return (
    <Masonry
      breakpointCols={{
        default: 5,
        1500: 4,
        1350: 3,
        1000: 2,
        800: 1,
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {renderIssueContainers(props.issues)}
    </Masonry>
  );
}
