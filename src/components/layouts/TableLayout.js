import "./TableLayout.scss";
import IssueContainer from "../blocks/IssueContainer";
import NoIssuesDisplay from "../blocks/NoIssuesDisplay";

export default function TableLayout(props) {
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
    <div className="table-view">
      {props.issues ? renderIssueContainers(props.issues) : <NoIssuesDisplay />}
    </div>
  );
}
