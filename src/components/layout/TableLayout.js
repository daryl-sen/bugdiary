import "./TableLayout.scss";
import IssueContainer from "../elements/IssueContainer";
import NoIssuesDisplay from "../elements/NoIssuesDisplay";

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
      {props.issues.issuesPrioritized
        ? renderIssueContainers(props.issues.issuesPrioritized)
        : null}
      {props.issues.issuesPending
        ? renderIssueContainers(props.issues.issuesPending)
        : null}
      {props.issues.issuesResolved
        ? renderIssueContainers(props.issues.issuesResolved)
        : null}
      {props.issues.issuesDeleted
        ? renderIssueContainers(props.issues.issuesDeleted)
        : null}

      {props.issues.issuesPrioritized.length === 0 &&
      props.issues.issuesPending.length === 0 &&
      props.issues.issuesDeleted.length === 0 &&
      props.issues.issuesResolved.length === 0 ? (
        <NoIssuesDisplay />
      ) : null}
    </div>
  );
}
