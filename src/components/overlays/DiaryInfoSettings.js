import TwoColumnLayout from "../layouts/TwoColumnLayout";
import WhiteBgContainer from "../blocks/WhiteBgContainer";
import LinedContainer from "../blocks/LinedContainer";
import DiaryInfoForm from "../forms/DiaryInfoForm";

export default function DiaryInfoSettings(props) {
  return (
    <TwoColumnLayout
      preset="confined"
      aside={
        <>
          <LinedContainer>
            <h2>Diary Ownership</h2>
            <p>
              This diary does not belong to any user, if you have the passcode,
              you can claim this diary and add it to your account.
            </p>
          </LinedContainer>
          <LinedContainer>
            <h2>Privacy Settings</h2>
            <p>
              Your diary privacy settings will determine whether issues are
              visible by default. We recommend defaulting to private issues if
              your reported issues may contain security issues.
            </p>
          </LinedContainer>
        </>
      }
    >
      <WhiteBgContainer>
        <DiaryInfoForm
          targetDiary={props.targetDiary}
          refresh={props.refresh}
        />
      </WhiteBgContainer>
    </TwoColumnLayout>
  );
}
