import TwoColumnLayout from "../layout/TwoColumnLayout";
import WhiteBgContainer from "./WhiteBgContainer";
import LinedContainer from "./LinedContainer";
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
        <DiaryInfoForm targetDiary={props.targetDiary} />
        {/* <h2>Diary Info</h2>
        <label>Diary Name</label>
        <input type="text" />
        <label>Diary Description</label>
        <textarea></textarea>

        <h3>Diary Sharing</h3>
        <p>
          Anyone with your diary's passcode can manage it on your behalf. Please
          only give it to someone you trust.
        </p>
        <label>Diary Passcode</label>
        <input type="text" />

        <h3>Diary Privacy</h3>
        <input type="radio" name="privacy" id="defaultPrivate" />
        <label htmlFor="defaultPrivate">
          <b>Default Private</b> - users have to uncheck the "make private"
          checkbox to make issues public.
        </label>
        <p>
          <input type="radio" name="privacy" id="defaultPublic" />
          <label htmlFor="defaultPublic">
            <b>Default Public</b> - users have to check the "make private"
            checkbox to make issues private.
          </label>
          <br />
          <input type="radio" name="privacy" id="enforcePrivate" />
          <label htmlFor="enforcePrivate">
            <b>Enforce Private</b> - users cannot choose issue visibility, all
            issues are private.
          </label>
        </p>
        <br />
        <button className="custom button-primary">Update Settings</button> */}
      </WhiteBgContainer>
    </TwoColumnLayout>
  );
}
