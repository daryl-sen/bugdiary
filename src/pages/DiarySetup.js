import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import NewDiaryForm from "../components/forms/NewDiaryForm";
import WhiteBgContainer from "../components/elements/WhiteBgContainer";

export default function DiarySetup() {
  return (
    <SingleColumnLayout
      styleOverride={{
        maxWidth: "500px",
        margin: "auto",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <WhiteBgContainer>
        <h1>Diary Setup</h1>
        <NewDiaryForm />
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
