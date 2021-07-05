import TwoColumnLayout from "../layouts/TwoColumnLayout";
import WhiteBgContainer from "../blocks/WhiteBgContainer";
import LinedContainer from "../blocks/LinedContainer";
import DiaryInfoForm from "../forms/DiaryInfoForm";
import { useAppContext, useDiaryContext } from "../../AppContext";
import { Link } from "react-router-dom";
import useDiaryFunctions from "../../hooks/useDiaryFunctions";

export default function DiaryInfoSettings(props) {
  const { context } = useAppContext();
  const { diaryContext } = useDiaryContext();
  const { transferOwnership } = useDiaryFunctions();

  return (
    <TwoColumnLayout
      preset="confined"
      aside={
        <>
          {diaryContext.targetDiary.user_id ? null : (
            <LinedContainer>
              <h2>Diary Ownership</h2>
              {context.loggedIn ? (
                <>
                  <p>
                    This diary does not belong to any user. Since you're
                    authenticated via passcode, you may add this diary to your
                    account.
                  </p>
                  <button
                    class="custom button-secondary"
                    onClick={() => {
                      transferOwnership(
                        diaryContext.targetDiary.uuid,
                        context.userDetails.id
                      );
                    }}
                  >
                    Claim Diary
                  </button>
                </>
              ) : (
                <>
                  <p>
                    This diary does not belong to any user. You can add this
                    diary to your account if you log in.
                  </p>
                  <Link to="/login">
                    <button className="custom button-secondary">Log In</button>
                  </Link>
                </>
              )}
            </LinedContainer>
          )}
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
