import LinedContainer from "../blocks/LinedContainer";
import { useAppContext, useDiaryContext } from "../../AppContext";
import { Link } from "react-router-dom";
import useDiaryFunctions from "../../hooks/useDiaryFunctions";
import { BiCopyAlt } from "react-icons/bi";
import { useState } from "react";

export default function DiarySettingsSidebar(props) {
  const { context } = useAppContext();
  const { diaryContext } = useDiaryContext();
  const { transferOwnership, updateAlias } = useDiaryFunctions();
  const [aliasUrl, setAliasUrl] = useState("");
  console.log(diaryContext)
  return (
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
                This diary does not belong to any user. You can add this diary
                to your account if you log in.
              </p>
              <Link to="/login">
                <button className="custom button-secondary">Log In</button>
              </Link>
            </>
          )}
        </LinedContainer>
      )}
      <LinedContainer>
        <h2>Diary Alias</h2>
        <p>
          You can copy your diary's URL by clicking on the "{<BiCopyAlt />}"
          icon in the shortcuts bar above. 
        </p>
        {diaryContext.targetDiary.alias ? (
          <>
            <p>
              Your diary alias is:
              <br />
              <b>https://bugdiary.com/r/{diaryContext.targetDiary.alias}</b>
            </p>
          </>
        ) : (
          <>
            <p>
              If you'd like, you can register a friendly alias for your diary! (This action is permanent)
            </p>

            {aliasUrl !== "" ? (
              <p
                style={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  fontSize: "0.8em",
                }}
              >
                URL: https://bugdiary.com/r/{aliasUrl}
              </p>
            ) : null}
            <input
              type="text"
              placeholder="bugdiary.com/r/friendly-name"
              onChange={(e) => {
                setAliasUrl(e.target.value);
              }}
            />
            <button className="custom button-secondary" onClick={() => {
              updateAlias(aliasUrl, diaryContext.targetDiary.uuid)
            }}>Register Alias</button>
          </>
        )}
      </LinedContainer>
    </>
  );
}
