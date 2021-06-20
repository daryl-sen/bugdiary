import "./IssueContainer.scss";
import IssueTag from "../elements/IssueTag";
import IssueFooter from "../elements/IssueFooter";
import IssueControls from "../elements/IssueControls";

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
      <IssueControls
        issueUuid={props.uuid}
        issueId={props.id}
        refresh={props.refresh}
        open={props.open}
        status={props.status}
        private={props.private}
      />
      <main>
        <h1>{props.reference || "Loading"}</h1>
        <div className="tags">
          <IssueTag type={props.status}>{props.status || "Loading"}</IssueTag>
          <IssueTag type="permanent">
            Type: {props.Type.name || "Loading"}
          </IssueTag>
          <IssueTag type="permanent">
            Loc: {props.Location.name || "Loading"}
          </IssueTag>
          {renderTags(props.tags)}
        </div>
        <p>{props.details || "Loading"}</p>
      </main>
      <IssueFooter
        reportDate={props.createdAt || props.created_at}
        reporterName={props.reporter_name}
        reporterEmail={props.reporter_email}
      />
    </div>
  );
}
