export default function IssueFooter(props) {
  return (
    <footer>
      <div>
        {props.reportDate
          ? new Date(props.reportDate).toDateString()
          : "No date"}
      </div>
      <div>
        {props.reporterName ? (
          props.reporterEmail ? (
            <a
              href={props.reporterEmail ? "mailto:" + props.reporterEmail : "#"}
              className="email"
            >
              {props.reporterName}
            </a>
          ) : (
            props.reporterName
          )
        ) : (
          "No author"
        )}
      </div>
    </footer>
  );
}
