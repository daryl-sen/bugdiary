import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import WhiteBgContainer from "../components/elements/WhiteBgContainer";

import DiaryVersionSetup from "../components/forms/DiaryVersionSetup";
import DiaryLocationsSetup from "../components/forms/DiaryLocationsSetup";
import DiaryTypesSetup from "../components/forms/DiaryTypesSetup";

export default function DiarySetup() {
  return (
    <SingleColumnLayout
      styleOverride={{
        maxWidth: "500px",
        margin: "auto",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <WhiteBgContainer>
        <h1>Diary Setup</h1>
        <p>
          Your diary is created! Let's add some basic labels to help you
          organize your project's issues.
        </p>
        <hr />
        <DiaryTypesSetup />
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
