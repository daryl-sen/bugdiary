import { useParams } from "react-router";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import MasonryContainer from "../components/layout/MasonryLayout";
import NavigationButton from "../components/elements/NavigationButton";
import LoadingIndicator from "../components/elements/LoadingIndicator";
import useDiaryFunctions from "../hooks/useDiaryFunctions";
import { useEffect, useState } from "react";

import FullScreenShade from "../components/elements/FullScreenShade";
import NewIssue from "../components/elements/NewIssue";

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
  }, [uuid]);

  if (!diaryContent) {
    return <LoadingIndicator />;
  }

  const { targetDiary, issues } = diaryContent;

  return (
    <>
      {overlayStatus === "add" && (
        <FullScreenShade>
          <NewIssue exit={toggleOverlay} />
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
        <NavigationButton>
          <BiBorderAll />
          &nbsp; Table View
        </NavigationButton>
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
        <MasonryContainer issues={issues} />
      </SingleColumnLayout>
    </>
  );
}
