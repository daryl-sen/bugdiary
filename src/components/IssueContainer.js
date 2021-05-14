import "./IssueContainer.scss";

export default function IssueContainer(props) {
  return (
    <div className="issue-container">
      <div className="controls">H</div>
      <main>
        <h1>Hello</h1>
        <div className="tags">
          <div>Tag 1</div>
          <div>Tag 2</div>
          <div>Tag 3</div>
        </div>
        <p>Content</p>
      </main>
      <footer>
        <div>Date</div>
        <div>Author</div>
      </footer>
    </div>
  );
}
