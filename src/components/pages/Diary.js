import { useParams } from "react-router";
import SingleColumnLayout from "../layouts/SingleColumnLayout";
import TwoColumnLayout from "../layouts/TwoColumnLayout";
import TableLayout from "../layouts/TableLayout";
import MasonryContainer from "../layouts/MasonryLayout";
import NavigationButton from "../elements/NavigationButton";
import LoadingIndicator from "../blocks/LoadingIndicator";
import useDiaryFunctions from "../../hooks/useDiaryFunctions";
import { useEffect, useState } from "react";

import FullScreenShade from "../blocks/FullScreenShade";
import WhiteBgContainer from "../blocks/WhiteBgContainer";
import NewIssueForm from "../forms/NewIssueForm";
import LinedContainer from "../blocks/LinedContainer";
import SearchPopup from "../overlays/SearchPopup";
import DiarySettingsPopup from "../overlays/DiarySettingsPopup";
import DiaryInfoSettings from "../overlays/DiaryInfoSettings";
import FilterIndicator from "../blocks/FilterIndicator";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { NotificationManager } from "react-notifications";

import PasscodePrompt from "../overlays/PasscodePrompt";

import {
  BiCopyAlt,
  BiBorderAll,
  BiBookAdd,
  BiSearch,
  BiCog,
  BiRevision,
  BiWindows,
  BiArrowBack,
  BiLockOpenAlt,
} from "react-icons/bi";
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

  return (
    <>
      {overlayStatus === true && view.popupView === "search" ? (
        <FullScreenShade styleOverride={{ padding: "1rem" }}>
          <SearchPopup
            exit={toggleOverlay}
            toggleViews={setView}
            view={view}
            modifyResults={setDiaryContent}
            updateFilterIndicator={setFilters}
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

      {overlayStatus === true && view.popupView === "accessPrompt" ? (
        <FullScreenShade
          styleOverride={{ padding: "1rem" }}
          clickEvent={toggleOverlay}
        >
          <PasscodePrompt />
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
          &nbsp; Filter
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
        {uInfo.jwt || uInfo.accessKey ? (
          <NavigationButton
            onClick={() => {
              toggleOverlay("settings");
            }}
          >
            <BiCog />
            &nbsp; Settings
          </NavigationButton>
        ) : (
          <NavigationButton
            onClick={() => {
              toggleOverlay("accessPrompt");
            }}
          >
            <BiLockOpenAlt />
          </NavigationButton>
        )}

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
