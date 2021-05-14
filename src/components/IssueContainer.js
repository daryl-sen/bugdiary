import "./IssueContainer.scss";
import IssueTag from "./IssueTag";
import IssueFooter from "./IssueFooter";

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
      <div className="controls">H</div>
      <main>
        <h1>Hello</h1>
        <div className="tags">
          <IssueTag type="pending">PENDING</IssueTag>
          <IssueTag type="permanent">Type: {props.type || "null"}</IssueTag>
          <IssueTag type="permanent">Loc: {props.location || "null"}</IssueTag>
          {renderTags(props.tags)}
          {/* {renderTags([1,2,3])} */}
        </div>
        <p>Content</p>
      </main>
      <IssueFooter
        reportDate={Date.now()}
        reporterName={props.reporter_name}
        reporterEmail={props.reporter_email}
      />
    </div>
  );
}
