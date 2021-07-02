import "./IssueControlButton.scss";
export default function IssueControlButton(props) {
  let style;

  if (props.currentStatus && props.currentStatus === props.targetStatus) {
    style = {
      boxShadow: "inset 0px 0px 15px 0px rgba(0,0,0,0.15)",
      WebKitBoxShadow: "inset 0px 0px 15px 0px rgba(0,0,0,0.15)",
      MozBoxShadow: "inset 0px 0px 15px 0px rgba(0,0,0,0.15)",
    };
  }

  const markIssue = () => {
    if (props.currentStatus === props.targetStatus) {
      return props.mark(2);
    }
    return props.mark(props.targetStatus);
  };
  return (
    <button
      className="issue-control-button"
      style={style}
      onClick={props.cancel || markIssue}
    >
      {props.children}
    </button>
  );
}
