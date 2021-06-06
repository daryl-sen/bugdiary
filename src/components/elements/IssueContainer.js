import "./IssueContainer.scss";
import IssueTag from "./IssueTag";
import IssueFooter from "./IssueFooter";
import IssueControls from "./IssueControls";

export default function IssueContainer(props) {
  const renderTags = (tags) => {
    if (Array.isArray(tags) && tags.length !== 0) {
      return tags.map((tag) => {
        return <IssueTag>{tag}</IssueTag>;
      });
    }
  };

  return (
    <div className="issue-container">
      <IssueControls />
      <main>
        <h1>{props.reference || "Loading"}</h1>
        <div className="tags">
          <IssueTag type="pending">{props.status || "Loading"}</IssueTag>
          <IssueTag type="permanent">Type: {props.type || "Loading"}</IssueTag>
          <IssueTag type="permanent">
            Loc: {props.location || "Loading"}
          </IssueTag>
          {renderTags(props.tags)}
        </div>
        <p>{props.details || "Loading"}</p>
      </main>
      <IssueFooter
        reportDate={props.report_date}
        reporterName={props.reporter_name}
        reporterEmail={props.reporter_email}
      />
    </div>
  );
}