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
import IndividualIssue from "../components/elements/IndividualIssue";
import LinedContainer from "../components/elements/LinedContainer";

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
  const { diaryContent, getDiaryContent } = useDiaryFunctions();
  const [overlayStatus, setOverlayStatus] = useState(false);
  const [viewType, setViewType] = useState("cards");

  const toggleOverlay = (componentName) => {
    setOverlayStatus((prev) => {
      if (prev) {
        return false;
      }
      return componentName;
    });
  };

  useEffect(() => {
    getDiaryContent(uuid);
  }, [overlayStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!diaryContent) {
    return <LoadingIndicator />;
  }

  const { targetDiary, issues } = diaryContent;

  return (
    <>
      <SingleColumnLayout
        styleOverride={{
          textAlign: "center",
        }}
      >
        <h1>{targetDiary.name}</h1>
        {viewType !== "new" ? (
          <NavigationButton
            onClick={() => {
              setViewType("new");
            }}
          >
            <BiBookAdd />
            &nbsp; New
          </NavigationButton>
        ) : (
          <NavigationButton
            onClick={() => {
              setViewType("cards");
            }}
          >
            <BiArrowBack />
            &nbsp; Back
          </NavigationButton>
        )}

        <NavigationButton>
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
        <NavigationButton target={"/setup/" + uuid}>
          <BiCog />
          &nbsp; Settings
        </NavigationButton>
        {viewType === "cards" && (
          <NavigationButton
            onClick={() => {
              setViewType("table");
            }}
          >
            <BiWindows />
          </NavigationButton>
        )}
        {viewType === "table" && (
          <NavigationButton
            onClick={() => {
              setViewType("cards");
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

        {viewType === "cards" && (
          <MasonryContainer
            issues={issues}
            refresh={() => {
              getDiaryContent(uuid);
            }}
            open={toggleOverlay}
          />
        )}
        {viewType === "table" && (
          <TableLayout
            issues={issues}
            refresh={() => {
              getDiaryContent(uuid);
            }}
            open={toggleOverlay}
          />
        )}
        {viewType === "new" && (
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
              <NewIssueForm exit={toggleOverlay} />
              <button type="button" className="custom button-secondary">
                Cancel
              </button>
            </WhiteBgContainer>
          </TwoColumnLayout>
        )}
      </SingleColumnLayout>
    </>
  );
}
