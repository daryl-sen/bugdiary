export default function IssueControlButton(props) {
  let style;

  if (props.currentStatus && props.currentStatus === props.targetStatus) {
    style = {
      outline: "3px inset #358bdc",
      // backgroundColor: "#b0d9ff",
    };
  }

  const markIssue = () => {
    if (props.currentStatus === props.targetStatus) {
      return props.mark("PENDING");
    }
    return props.mark(props.targetStatus);
  };
  return (
    <button style={style} onClick={props.cancel || markIssue}>
      {props.children}
    </button>
  );
}
