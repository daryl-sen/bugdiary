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
        onClick={() => {
          setDiaryContext((prev) => {
            return { ...prev, mode: "filter" };
          });
        }}
      >
        <BiSearch />
        &nbsp; Filter
      </NavigationButton>

      <CopyToClipboard text={"https://www.bugdiary.com/diary/" + uuid}>
        <NavigationButton
          onClick={() => {
            NotificationManager.success("URL copied!");
          }}
        >
          <BiCopyAlt />
          &nbsp; URL
        </NavigationButton>
      </CopyToClipboard>

      {(context.jwt && context.id === diaryContext.targetDiary.user_id) ||
      context.authenticatedDiaries.includes(uuid) ? (
        <NavigationButton
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
        onClick={() => {
          getDiaryContent(uuid);
        }}
      >
        <BiRevision />
      </NavigationButton>
    </>
  );
}
