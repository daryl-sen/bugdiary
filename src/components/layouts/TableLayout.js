import "./TableLayout.scss";
import useIssueFunctions from "../../hooks/useIssueFunctions";
import HiddenIssueCount from "../blocks/HiddenIssueCount";

export default function TableLayout(props) {
  const { renderIssueContainers } = useIssueFunctions();

  return (
    <div className="table-view">
      <HiddenIssueCount />
      {renderIssueContainers(props.issues)}
    </div>
  );
}
