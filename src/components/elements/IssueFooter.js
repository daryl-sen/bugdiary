import "./IssueFooter.scss";

export default function IssueFooter(props) {
  return (
    <footer>
      <div>{props.reportDate || "No date provided"}</div>
      <div>
        <a
          href={props.reporterEmail ? "mailto:" + props.reporterEmail : "#"}
          className="email"
        >
          {props.reporterName || "No author provided"}
        </a>
      </div>
    </footer>
  );
}
