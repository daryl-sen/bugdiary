import { useParams } from "react-router";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import TwoColumnLayout from "../components/layout/TwoColumnLayout";
import TableLayout from "../components/layout/TableLayout";
import MasonryContainer from "../components/layout/MasonryLayout";
import NavigationButton from "../components/elements/NavigationButton";
import LoadingIndicator from "../components/elements/LoadingIndicator";
import useDiaryFunctions from "../hooks/useDiaryFunctions";
import { useEffect, useState } from "react";

import FullScreenShade from "../components/elements/FullScreenShade";
import WhiteBgContainer from "../components/elements/WhiteBgContainer";
import NewIssueForm from "../components/forms/NewIssueForm";
// import IndividualIssue from "../components/elements/IndividualIssue";
import LinedContainer from "../components/elements/LinedContainer";
import SearchPopup from "../components/elements/SearchPopup";
import DiarySettingsPopup from "../components/elements/DiarySettingsPopup";
import DiaryInfoSettings from "../components/elements/DiaryInfoSettings";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { NotificationManager } from "react-notifications";

import {
  BiCopyAlt,
  BiBorderAll,
  BiBookAdd,
  BiSearch,
  BiCog,
  BiRevision,
  BiWindows,
  BiArrowBack,
} from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Diary(props) {
  const { uuid } = useParams();
  const {
    diaryContent,
    getDiaryContent,
    setDiaryContent,
  } = useDiaryFunctions();
  const [overlayStatus, setOverlayStatus] = useState(false);
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

  const {
    targetDiary,
    issuesPending,
    issuesPrioritized,
    issuesDeleted,
    issuesResolved,
  } = diaryContent;

  return (
    <>
      {overlayStatus === true && view.popupView === "search" ? (
        <FullScreenShade styleOverride={{ padding: "1rem" }}>
          <SearchPopup
            exit={toggleOverlay}
            toggleViews={setView}
            view={view}
            modifyResults={setDiaryContent}
          />
        </FullScreenShade>
      ) : null}

      {overlayStatus === true && view.popupView === "settings" ? (
        <FullScreenShade
          styleOverride={{ padding: "1rem" }}
          clickEvent={toggleOverlay}
        >
          <DiarySettingsPopup
            diaryUuid={targetDiary.uuid}
            diaryExpiry={targetDiary.expiry_date}
            exit={toggleOverlay}
            target={(target) => {
              setView((prev) => {
                return { ...prev, functionView: target };
              });
            }}
          />
        </FullScreenShade>
      ) : null}

      <SingleColumnLayout
        styleOverride={{
          textAlign: "center",
        }}
      >
        <h1>{targetDiary.name}</h1>
        {view.functionView === "" ? (
          <NavigationButton
            onClick={() => {
              setView((prev) => {
                return { ...prev, functionView: "add" };
              });
            }}
          >
            <BiBookAdd />
            &nbsp; New
          </NavigationButton>
        ) : (
          <NavigationButton
            onClick={() => {
              setView((prev) => {
                return { ...prev, functionView: "" };
              });
            }}
          >
            <BiArrowBack />
            &nbsp; Back
          </NavigationButton>
        )}

        <NavigationButton
          onClick={() => {
            toggleOverlay("search");
          }}
        >
          <BiSearch />
          &nbsp; Search
        </NavigationButton>
        <CopyToClipboard text={"https://www.bugdiary.com/diary/" + uuid}>
          <NavigationButton
            onClick={() => {
              NotificationManager.success("URL copied!");
            }}
          >
            <BiCopyAlt />
            &nbsp; Copy URL
          </NavigationButton>
        </CopyToClipboard>
        <NavigationButton
          onClick={() => {
            toggleOverlay("settings");
          }}
        >
          <BiCog />
          &nbsp; Settings
        </NavigationButton>

        {view.issueView === "cards" && (
          <NavigationButton
            onClick={() => {
              setView((prev) => {
                return { ...prev, issueView: "table" };
              });
            }}
          >
            <BiWindows />
          </NavigationButton>
        )}

        {view.issueView === "table" && (
          <NavigationButton
            onClick={() => {
              setView((prev) => {
                return { ...prev, issueView: "cards" };
              });
            }}
          >
            <BiBorderAll />
          </NavigationButton>
        )}
        <NavigationButton
          onClick={() => {
            getDiaryContent(uuid);
          }}
        >
          <BiRevision />
        </NavigationButton>

        {view.issueView === "cards" && view.functionView === "" ? (
          <MasonryContainer
            issues={{
              issuesPending,
              issuesPrioritized,
              issuesDeleted,
              issuesResolved,
            }}
            displayStatus={{
              showDeleted: view.showDeleted,
              showResolved: view.showResolved,
            }}
            refresh={() => {
              getDiaryContent(uuid);
            }}
          />
        ) : null}

        {view.issueView === "table" && view.functionView === "" ? (
          <TableLayout
            issues={{
              issuesPending,
              issuesPrioritized,
              issuesDeleted,
              issuesResolved,
            }}
            displayStatus={{
              showDeleted: view.showDeleted,
              showResolved: view.showResolved,
            }}
            refresh={() => {
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
              getDiaryContent(uuid);
            }}
          />
        )}
      </SingleColumnLayout>
    </>
  );
}
