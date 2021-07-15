import "./TableLayout.scss";
import useIssueFunctions from "../../hooks/useIssueFunctions";


export default function TableLayout(props) {
  const { renderIssueContainers } = useIssueFunctions();

  return (
    <div className="table-view">{renderIssueContainers(props.issues)}</div>
  );
}
