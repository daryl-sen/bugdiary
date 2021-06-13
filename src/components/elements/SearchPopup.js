import { useState } from "react";
import "./SearchPopup.scss";
import WhiteBgContainer from "./WhiteBgContainer";

export default function SearchPopup(props) {
  const [searchTerm, setSearchTerm] = useState();

  const filterResults = (term, results) => {
    if (!term || !results) {
      return;
    }
    return results.filter((issue) => {
      return (
        issue.reference.toLowerCase().includes(term.toLowerCase()) ||
        issue.details.toLowerCase().includes(term.toLowerCase()) ||
        issue.reporter_name.toLowerCase().includes(term.toLowerCase()) ||
        issue.reporter_email.toLowerCase().includes(term.toLowerCase())
      );
    });
  };

  const sortResults = (orderBy, results) => {};

  const modifyResults = (mode, term) => {
    if (mode === "filter") {
      props.modifyResults((prev) => {
        return {
          ...prev,
          issuesPending: filterResults(term, prev.issuesPending),
        };
      });
    } else if (mode === "sort") {
      props.modifyResults((prev) => {
        return {
          ...prev,
          issuesPending: sortResults(term, prev.issuesPending),
        };
      });
    }
  };

  return (
    <WhiteBgContainer preset="narrow">
      <h2>Search and Filter</h2>
      <input
        type="text"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button
        className="custom"
        onClick={() => {
          props.toggleViews((prev) => {
            if (prev.showResolved) {
              return { ...prev, showResolved: false };
            }
            return { ...prev, showResolved: true };
          });
        }}
      >
        {props.view.showResolved
          ? "Showing Resolved Issues"
          : "Hiding Resolved Issues"}
      </button>
      <button
        className="custom"
        onClick={() => {
          props.toggleViews((prev) => {
            if (prev.showDeleted) {
              return { ...prev, showDeleted: false };
            }
            return { ...prev, showDeleted: true };
          });
        }}
      >
        {props.view.showDeleted
          ? "Showing Deleted Issues"
          : "Hiding Deleted Issues"}
      </button>
      <div className="side-by-side">
        <div>
          <button
            type="submit"
            className="button-primary"
            onClick={() => {
              modifyResults("filter", searchTerm);
            }}
          >
            Search
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="button-secondary"
            onClick={props.exit}
          >
            Cancel
          </button>
        </div>
      </div>
    </WhiteBgContainer>
  );
}
