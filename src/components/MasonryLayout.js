import "./MasonryLayout.scss";
import Masonry from "react-masonry-css";
import IssueContainer from "./IssueContainer";

import useSampleData from "../hooks/useSampleData";

export default function MasonryLayout(props) {
  const renderIssueContainers = (issues) => {
    if (!Array.isArray(issues)) {
      return "none";
    }
    return issues.map((issue) => {
      return <IssueContainer key={issue.id} {...issue} />;
    });
  };

  const { sampleIssues } = useSampleData();

  return (
    <Masonry
      breakpointCols={{
        default: 3,
        700: 2,
        500: 1,
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {renderIssueContainers(sampleIssues)}
    </Masonry>
  );
}
