import "./NoIssuesDisplay.scss";

export default function NoIssuesDisplay(props) {
  return (
    <div id="no-issues">
      <h2>No Issues To Display</h2>
      <p>There isn't any issues to show, maybe you solved them all!</p>
      <p>Private issues will not be shown here if you're not logged in.</p>
    </div>
  );
}
