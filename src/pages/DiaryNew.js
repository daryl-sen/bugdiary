import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import NewDiaryForm from "../components/forms/NewDiaryForm";
import WhiteBgContainer from "../components/elements/WhiteBgContainer";

export default function DiarySetup() {
  return (
    <SingleColumnLayout preset="narrow-centered">
      <WhiteBgContainer>
        <h1>New Diary</h1>
        <NewDiaryForm />
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
