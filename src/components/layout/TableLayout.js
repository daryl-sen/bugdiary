import "./TableLayout.scss";
import IssueContainer from "../elements/IssueContainer";

export default function TableLayout(props) {
  const renderIssueContainers = (issues) => {
    if (!Array.isArray(issues)) {
      return "none";
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
