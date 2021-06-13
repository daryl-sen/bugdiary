import "./FilterIndicator.scss";

export default function FilterIndicator(props) {
  const renderSearchTerms = (terms) => {
    return terms;
  };

  return (
    <div className="filter-indicator">
      Showing results that contain {renderSearchTerms(props.terms)}, sorted by
      ...
    </div>
  );
}
