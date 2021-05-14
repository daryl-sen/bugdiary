import "./MasonryContainer.scss";
import Masonry from "react-masonry-css";
import IssueContainer from "./IssueContainer";

import useSampleData from "../hooks/useSampleData";

export default function MasonryContainer(props) {
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
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {renderIssueContainers(sampleIssues)}
    </Masonry>
  );
}
