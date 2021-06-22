import { useState } from "react";
import "./SearchPopup.scss";
import WhiteBgContainer from "../blocks/WhiteBgContainer";
import { useDiaryContext } from "../../AppContext";
import SingleColumnLayout from "../layouts/SingleColumnLayout";
import useIssueFunctions from "../../hooks/useIssueFunctions";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../blocks/LoadingIndicator";

export default function IssueSearchBox(props) {
  const uuid = useParams().uuid;
  const [searchTerm, setSearchTerm] = useState("");
  const { searchIssues } = useIssueFunctions();
  const { diaryContext, setDiaryContext } = useDiaryContext();
  const [loadingStatus, setLoadingStatus] = useState(false);

  // const filterResults = (term, results) => {
  //   console.log("filtering");
  //   if (!term || !results) {
  //     return;
  //   }
  //   return results.filter((issue) => {
  //     return (
  //       // search term
  //       (issue.reference.toLowerCase().includes(term.toLowerCase()) ||
  //         issue.details.toLowerCase().includes(term.toLowerCase()) ||
  //         issue.reporter_name.toLowerCase().includes(term.toLowerCase()) ||
  //         issue.reporter_email.toLowerCase().includes(term.toLowerCase())) &&
  //       // status
  //       (issue.status === "DELETED" ? props.showDeleted : true) &&
  //       (issue.status === "RESOLVED" ? props.showResolved : true)
  //     );
  //   });
  // };

  // const sortResults = (orderBy, results) => {};

  const modifyResults = (mode, term) => {};

  return (
    <SingleColumnLayout preset="narrow-centered">
      {loadingStatus && <LoadingIndicator />}
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
            setDiaryContext((prev) => {
              return {
                ...prev,
                config: {
                  ...prev.config,
                  showResolved: !prev.config.showResolved,
                },
              };
            });
          }}
        >
          {diaryContext.config.showResolved
            ? "Showing Resolved Issues"
            : "Hiding Resolved Issues"}
        </button>
        <button
          className="custom"
          onClick={() => {
            setDiaryContext((prev) => {
              return {
                ...prev,
                config: {
                  ...prev.config,
                  showDeleted: !prev.config.showDeleted,
                },
              };
            });
          }}
        >
          {diaryContext.config.showDeleted
            ? "Showing Deleted Issues"
            : "Hiding Deleted Issues"}
        </button>
        <div className="side-by-side">
          <div>
            <button
              type="submit"
              className="button-primary"
              onClick={async () => {
                setLoadingStatus(true);
                await searchIssues(
                  searchTerm.toLowerCase(),
                  uuid,
                  diaryContext.config.showResolved,
                  diaryContext.config.showDeleted
                );
                await setDiaryContext((prev) => {
                  return { ...prev, mode: "show" };
                });
              }}
            >
              Search
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="button-secondary"
              onClick={() => {
                setDiaryContext((prev) => {
                  return { ...prev, mode: "show" };
                });
                modifyResults("filter", searchTerm);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
