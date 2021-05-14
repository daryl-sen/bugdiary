import "./MasonryContainer.scss";
import Masonry from "react-masonry-css";
import IssueContainer from "./IssueContainer";

export default function MasonryContainer(props) {
  const renderIssueContainers = (issues) => {
    return issues.map((issue) => {
      return <IssueContainer key={issue.id} />;
    });
  };

  return (
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {renderIssueContainers([1, 2, 3])}
    </Masonry>
  );
}
