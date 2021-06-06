import "./IssueTag.scss";
export default function IssueTag(props) {
  let defaultBg = "#e6e6e6";

  if (props.type) {
    switch (props.type) {
      case "pending":
        defaultBg = "#f0cf65";
        break;
      case "resolved":
        defaultBg = "#ddedaa";
        break;
      case "pinned":
        defaultBg = "#cf6b6e";
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
