import "./IssueTag.scss";
export default function IssueTag(props) {
  return (
    <div
      className="tag"
      style={{
        backgroundColor: props.backgroundColor || "#e6e6e6",
      }}
    >
      {props.children || "tag"}
    </div>
  );
}
