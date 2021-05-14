import "./IssueContainer.scss";
import IssueTag from "./IssueTag";

export default function IssueContainer(props) {
  const renderTags = (tags) => {
    if (Array.isArray(tags) && tags.length !== 0) {
      return tags.map((tag) => {
        return <IssueTag>{tag}</IssueTag>;
      });
    }
    return <IssueTag>Error loading tags...</IssueTag>;
  };

  return (
    <div className="issue-container">
      <div className="controls">H</div>
      <main>
        <h1>Hello</h1>
        <div className="tags">{renderTags()}</div>
        <p>Content</p>
      </main>
      <footer>
        <div>Date</div>
        <div>Author</div>
      </footer>
    </div>
  );
}
