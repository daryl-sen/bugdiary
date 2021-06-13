import "./FilterIndicator.scss";
import IssueTag from "./IssueTag";

export default function FilterIndicator(props) {
  const renderSearchTerms = (terms) => {
    return terms.map((term) => {
      return (
        <IssueTag backgroundColor="#393939" type="none">
          {term}
        </IssueTag>
      );
    });
  };

  return (
    <div className="filter-indicator">
      Showing results that contain: {renderSearchTerms(props.terms)}, sorted by
      <b> creation date</b>.<br />
      <button onClick={props.refresh}>Clear Filters</button>
    </div>
  );
}
