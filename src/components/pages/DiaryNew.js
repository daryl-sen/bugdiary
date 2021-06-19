import SingleColumnLayout from "../layouts/SingleColumnLayout";
import NewDiaryForm from "../forms/NewDiaryForm";
import WhiteBgContainer from "../blocks/WhiteBgContainer";

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
