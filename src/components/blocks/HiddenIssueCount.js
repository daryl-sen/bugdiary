import "./HiddenIssueCount.scss";

export default function HiddenIssueCount(props) {
  return (
    <div className="hidden-issue-count">
      <div>
        <h2>
          {props.count} Hidden Issue
          {props.count > 1 ? "s" : null}
        </h2>
        <p>
          To see private issues, please sign in or authenticate by clicking on
          the unlock icon in the shortcuts bar.
        </p>
      </div>
    </div>
  );
}
