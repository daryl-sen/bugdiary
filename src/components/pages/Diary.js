import { useParams } from "react-router";
import SingleColumnLayout from "../layouts/SingleColumnLayout";
import TwoColumnLayout from "../layouts/TwoColumnLayout";
import TableLayout from "../layouts/TableLayout";
import MasonryContainer from "../layouts/MasonryLayout";
import LoadingIndicator from "../blocks/LoadingIndicator";
import useDiaryFunctions from "../../hooks/useDiaryFunctions";
import { useEffect, useState } from "react";

import WhiteBgContainer from "../blocks/WhiteBgContainer";
import NewIssueForm from "../forms/NewIssueForm";
import LinedContainer from "../blocks/LinedContainer";
import DiaryInfoSettings from "../overlays/DiaryInfoSettings";
import FilterIndicator from "../blocks/FilterIndicator";
import DiaryOverlay from "../blocks/DiaryOverlay";
import ShortcutNavigation from "../blocks/ShortcutNavigation";

import { Link } from "react-router-dom";

export default function Diary(props) {
  const { uuid } = useParams();
  const {
    uInfo,
    diaryContent,
    getDiaryContent,
    setDiaryContent,
  } = useDiaryFunctions();
  const [overlayStatus, setOverlayStatus] = useState(false);
  const [filters, setFilters] = useState([]);
  const [view, setView] = useState({
    issueView: undefined,
    functionView: undefined,
    popupView: undefined,
    showResolved: false,
    showDeleted: false,
  });
  const functionView = useParams().functionView || "";

  const toggleOverlay = (overlayComponentName) => {
    if (overlayComponentName) {
      setView((prev) => {
        return { ...prev, popupView: overlayComponentName };
      });
    }
    setOverlayStatus((prev) => {
      if (prev) {
        return false;
      }
      return true;
    });
  };

  useEffect(() => {
    setView({
      issueView: "cards",
      functionView,
    });
    getDiaryContent(uuid);
  }, [setView]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!diaryContent) {
    return <LoadingIndicator />;
  }

  const { targetDiary, issues } = diaryContent;

  if (!targetDiary) {
    return (
      <SingleColumnLayout preset="narrow-centered">
        <WhiteBgContainer>
          <h1>No Diary Found</h1>
          <p>
            Oops, we couldn't find a diary with that UUID! It might have expired
            due to inactivity. Diaries expire after 3 months of inactivity.
          </p>
          <Link to="/new">
            <button className="custom button-primary">Create a Diary</button>
          </Link>
        </WhiteBgContainer>
      </SingleColumnLayout>
    );
  }

  return (
    <>
      <DiaryOverlay
        overlayStatus={overlayStatus}
        view={view}
        setView={setView}
        toggleOverlay={toggleOverlay}
        targetDiary={targetDiary}
        setDiaryContent={setDiaryContent}
      />

      <SingleColumnLayout
        styleOverride={{
          textAlign: "center",
        }}
      >
        <h1>{targetDiary.name}</h1>

        <ShortcutNavigation
          view={view}
          setView={setView}
          toggleOverlay={toggleOverlay}
          uInfo={uInfo}
          getDiaryContent={getDiaryContent}
        />

        {filters.length ? (
          <FilterIndicator
            terms={filters}
            refresh={() => {
              setFilters([]);
              getDiaryContent(uuid);
            }}
          />
        ) : null}

        {view.issueView === "cards" && view.functionView === "" ? (
          <MasonryContainer
            issues={issues}
            refresh={() => {
              setFilters([]);
              getDiaryContent(uuid);
            }}
          />
        ) : null}

        {view.issueView === "table" && view.functionView === "" ? (
          <TableLayout
            issues={issues}
            refresh={() => {
              setFilters([]);
              getDiaryContent(uuid);
            }}
          />
        ) : null}

        {view.functionView === "add" && (
          <TwoColumnLayout
            preset={"confined"}
            aside={
              <>
                <LinedContainer>
                  <h2>Help Message</h2>
                  <p>
                    User-defined help message, may also include contact
                    information.
                  </p>
                </LinedContainer>
                <LinedContainer>
                  <h2>Try BugDiary</h2>
                  <p>
                    BugDiary is an online issue-tracking platform that has{" "}
                    <b>no learning curve</b> and is free to use!
                  </p>
                  <Link to="/">
                    <button className="custom button-primary">
                      Get Started
                    </button>
                  </Link>
                </LinedContainer>
              </>
            }
          >
            <WhiteBgContainer>
              <h2>Report New Issue</h2>
              <NewIssueForm
                exit={() => {
                  setView((prev) => {
                    return { ...prev, functionView: "" };
                  });
                }}
                refresh={() => {
                  setFilters([]);
                  getDiaryContent(uuid);
                }}
              />
              <button
                type="button"
                className="custom button-secondary"
                onClick={() => {
                  setView((prev) => {
                    return { ...prev, functionView: "" };
                  });
                }}
              >
                Cancel
              </button>
            </WhiteBgContainer>
          </TwoColumnLayout>
        )}

        {view.functionView === "diaryInfo" && (
          <DiaryInfoSettings
            targetDiary={targetDiary}
            refresh={() => {
              setFilters([]);
              getDiaryContent(uuid);
            }}
          />
        )}
      </SingleColumnLayout>
    </>
  );
}
