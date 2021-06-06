import { useParams } from "react-router";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import MasonryContainer from "../components/layout/MasonryLayout";
import NavigationButton from "../components/elements/NavigationButton";
import LoadingIndicator from "../components/elements/LoadingIndicator";
import useDiaryFunctions from "../hooks/useDiaryFunctions";
import { useEffect } from "react";

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

  useEffect(() => {
    getDiaryContent(uuid);
  }, [uuid]);

  if (!diaryContent) {
    return <LoadingIndicator />;
  }

  const { targetDiary, issues } = diaryContent;

  return (
    <SingleColumnLayout
      styleOverride={{
        textAlign: "center",
      }}
    >
      <h1>{targetDiary.name}</h1>
      <NavigationButton>
        <BiCopyAlt />
        &nbsp; Share Link
      </NavigationButton>
      <NavigationButton>
        <BiBorderAll />
        &nbsp; Table View
      </NavigationButton>
      <NavigationButton>
        <BiBookAdd />
        &nbsp; Add New
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
        <BiCog />
        &nbsp; Settings
      </NavigationButton>
      <MasonryContainer issues={issues} />
    </SingleColumnLayout>
  );
}
