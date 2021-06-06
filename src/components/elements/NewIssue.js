import "./NewIssue.scss";

import WhiteBgContainer from "../elements/WhiteBgContainer";
import NewIssueForm from "../forms/NewIssueForm";

export default function NewIssue(props) {
  return (
    <WhiteBgContainer preset="narrow">
      <h2>Report New Issue</h2>
      <NewIssueForm />
      <button
        type="button"
        className="custom button-secondary"
        onClick={props.exit}
      >
        Cancel
      </button>
    </WhiteBgContainer>
  );
}
