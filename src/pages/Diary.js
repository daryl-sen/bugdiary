import { useParams } from "react-router";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import TableLayout from "../components/layout/TableLayout";
import MasonryContainer from "../components/layout/MasonryLayout";
import NavigationButton from "../components/elements/NavigationButton";
import LoadingIndicator from "../components/elements/LoadingIndicator";
import useDiaryFunctions from "../hooks/useDiaryFunctions";
import { useEffect, useState } from "react";

import FullScreenShade from "../components/elements/FullScreenShade";
import WhiteBgContainer from "../components/elements/WhiteBgContainer";
import NewIssueForm from "../components/forms/NewIssueForm";

import {
  BiCopyAlt,
  BiBorderAll,
  BiBookAdd,
  BiBarChartAlt,
  BiSearch,
  BiCog,
} from "react-icons/bi";

export default function Diary(props) {
  const { uuid } = useParams();
  const { diaryContent, getDiaryContent } = useDiaryFunctions();
  const [overlayStatus, setOverlayStatus] = useState(false);
  const viewType = useParams().viewType || "cards";

  const toggleOverlay = (componentName) => {
    setOverlayStatus((prev) => {
      if (prev) {
        return false;
      }
      return componentName;
    });
  };

  useEffect(() => {
    console.log("updating");
    getDiaryContent(uuid);
  }, [overlayStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!diaryContent) {
    return <LoadingIndicator />;
  }

  const { targetDiary, issues } = diaryContent;

  return (
    <>
      {overlayStatus === "add" && (
        <FullScreenShade>
          <WhiteBgContainer preset="narrow">
            <h2>Report New Issue</h2>
            <NewIssueForm exit={toggleOverlay} />
            <button
              type="button"
              className="custom button-secondary"
              onClick={toggleOverlay}
            >
              Cancel
            </button>
          </WhiteBgContainer>
        </FullScreenShade>
      )}

      <SingleColumnLayout
        styleOverride={{
          textAlign: "center",
        }}
      >
        <h1>{targetDiary.name}</h1>
        <NavigationButton
          onClick={() => {
            toggleOverlay("add");
          }}
        >
          <BiBookAdd />
          &nbsp; Add New
        </NavigationButton>
        {viewType === "cards" && (
          <NavigationButton target={"/diary/" + uuid + "/table"}>
            <BiBorderAll />
            &nbsp; Cards View
          </NavigationButton>
        )}
        {viewType === "table" && (
          <NavigationButton target={"/diary/" + uuid + "/cards"}>
            <BiBorderAll />
            &nbsp; Table View
          </NavigationButton>
        )}
        <NavigationButton>
          <BiBarChartAlt />
          &nbsp; Sort
        </NavigationButton>
        <NavigationButton>
          <BiSearch />
          &nbsp; Search
        </NavigationButton>
        <NavigationButton>
          <BiCopyAlt />
          &nbsp; Share Link
        </NavigationButton>
        <NavigationButton target={"/setup/" + uuid}>
          <BiCog />
          &nbsp; Settings
        </NavigationButton>
        {viewType === "cards" && <MasonryContainer issues={issues} />}
        {viewType === "table" && <TableLayout issues={issues} />}
      </SingleColumnLayout>
    </>
  );
}
