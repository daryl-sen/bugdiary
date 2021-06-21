import "./MasonryLayout.scss";
import Masonry from "react-masonry-css";
import IssueContainer from "../blocks/IssueContainer";
import NoIssuesDisplay from "../blocks/NoIssuesDisplay";

export default function MasonryLayout(props) {
  const renderIssueContainers = (issues) => {
    if (Array.isArray(issues)) {
      if (issues.length > 0) {
        return issues.map((issue) => {
          return <IssueContainer key={issue.id} {...issue} />;
        });
      }
      return <NoIssuesDisplay />;
    }
  };

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
      {renderIssueContainers(props.issues)}
    </Masonry>
  );
}
