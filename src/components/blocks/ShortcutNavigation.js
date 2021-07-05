import { CopyToClipboard } from "react-copy-to-clipboard";
import { NotificationManager } from "react-notifications";
import NavigationButton from "../elements/NavigationButton";
import {
  BiCopyAlt,
  BiBorderAll,
  BiBookAdd,
  BiSearch,
  BiCog,
  BiRevision,
  BiWindows,
  BiArrowBack,
  BiLockOpenAlt,
} from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useAppContext, useDiaryContext } from "../../AppContext";
import useDiaryFunctions from "../../hooks/useDiaryFunctions";

export default function ShortcutNavigation(props) {
  const { context } = useAppContext();
  const { diaryContext, setDiaryContext } = useDiaryContext();
  const { getDiaryContent } = useDiaryFunctions();
  const uuid = useParams().uuid;

  return (
    <>
      {diaryContext.mode === "show" ? (
        <NavigationButton
          testId={"new-issue-button"}
          onClick={() => {
            setDiaryContext((prev) => {
              return { ...prev, mode: "add" };
            });
          }}
        >
          <BiBookAdd />
          &nbsp; New
        </NavigationButton>
      ) : (
        <NavigationButton
          testId={"diary-back-button"}
          onClick={() => {
            setDiaryContext((prev) => {
              return { ...prev, mode: "show" };
            });
          }}
        >
          <BiArrowBack />
          &nbsp; Back
        </NavigationButton>
      )}

      <NavigationButton
        testId={"search-button"}
        onClick={() => {
          setDiaryContext((prev) => {
            return { ...prev, mode: "filter" };
          });
        }}
      >
        <BiSearch />
        &nbsp; Search
      </NavigationButton>

      <CopyToClipboard text={"https://www.bugdiary.com/diary/" + uuid}>
        <NavigationButton
          testId={"copy-url-button"}
          onClick={() => {
            NotificationManager.success("URL copied!");
          }}
        >
          <BiCopyAlt />
          &nbsp; URL
        </NavigationButton>
      </CopyToClipboard>

      {(context.loggedIn && context.userDetails.id === diaryContext.targetDiary.user_id) ||
      context.authenticatedDiaries.includes(uuid) ? (
        <NavigationButton
          testId={"settings-button"}
          onClick={() => {
            setDiaryContext((prev) => {
              return { ...prev, mode: "diarySettings" };
            });
          }}
        >
          <BiCog />
        </NavigationButton>
      ) : (
        <NavigationButton
          testId={"passcode-button"}
          onClick={() => {
            setDiaryContext((prev) => {
              return { ...prev, mode: "passcodePrompt" };
            });
          }}
        >
          <BiLockOpenAlt />
        </NavigationButton>
      )}

      {diaryContext.config.displayType === "cards" && (
        <NavigationButton
          testId={"cards-view-button"}
          onClick={() => {
            setDiaryContext((prev) => {
              return {
                ...prev,
                mode: "show",
                config: { ...prev.config, displayType: "table" },
              };
            });
          }}
        >
          <BiWindows />
        </NavigationButton>
      )}

      {diaryContext.config.displayType === "table" && (
        <NavigationButton
          testId={"table-view-button"}
          onClick={() => {
            setDiaryContext((prev) => {
              return {
                ...prev,
                mode: "show",
                config: { ...prev.config, displayType: "cards" },
              };
            });
          }}
        >
          <BiBorderAll />
        </NavigationButton>
      )}

      <NavigationButton
        testId={"refresh-button"}
        onClick={() => {
          getDiaryContent(uuid);
        }}
      >
        <BiRevision />
      </NavigationButton>
    </>
  );
}
