import "./TableLayout.scss";
import IssueContainer from "../elements/IssueContainer";
import NoIssuesDisplay from "../elements/NoIssuesDisplay";

export default function TableLayout(props) {
  const renderIssueContainers = (issues) => {
    if (!Array.isArray(issues) || issues.length === 0) {
      return <NoIssuesDisplay />;
    }
    return issues.map((issue) => {
      return (
        <IssueContainer key={issue.id} {...issue} refresh={props.refresh} />
      );
    });
  };

  return (
    <div className="table-view">{renderIssueContainers(props.issues)}</div>
  );
}
