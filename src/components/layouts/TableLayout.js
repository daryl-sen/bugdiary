import "./TableLayout.scss";
import IssueContainer from "../blocks/IssueContainer";
import NoIssuesDisplay from "../blocks/NoIssuesDisplay";

export default function TableLayout(props) {
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
    <div className="table-view">{renderIssueContainers(props.issues)}</div>
  );
}
