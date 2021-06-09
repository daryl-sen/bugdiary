import "./IssueTag.scss";
export default function IssueTag(props) {
  let defaultBg = "#e6e6e6";

  if (props.type) {
    switch (props.type) {
      case "PENDING":
        defaultBg = "#f0cf65";
        break;
      case "RESOLVED":
        defaultBg = "#ddedaa";
        break;
      case "PRIORITIZED":
        defaultBg = "#cf6b6e";
        break;
      case "DELETED":
        defaultBg = "#e6e6e6";
        break;
      default:
        defaultBg = "#393939";
    }
  }

  return (
    <div
      className="tag"
      style={{
        backgroundColor: props.backgroundColor || defaultBg,
        color: defaultBg === "#393939" ? "#fff" : "#000",
      }}
    >
      {props.children || "tag"}
    </div>
  );
}
