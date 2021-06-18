import "./MasonryLayout.scss";
import Masonry from "react-masonry-css";
import IssueContainer from "../elements/IssueContainer";
import NoIssuesDisplay from "../elements/NoIssuesDisplay";

export default function MasonryLayout(props) {
  const renderIssueContainers = (issues) => {
    if (Array.isArray(issues)) {
      return issues.map((issue) => {
        return (
          <IssueContainer key={issue.id} {...issue} refresh={props.refresh} />
        );
      });
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
      {props.issues ? renderIssueContainers(props.issues) : <NoIssuesDisplay />}
    </Masonry>
  );
}
