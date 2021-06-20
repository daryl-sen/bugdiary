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

export default function ShortcutNavigation(props) {
  const uuid = useParams().uuid;
  return (
    <>
      {props.view.functionView === "" ? (
        <NavigationButton
          onClick={() => {
            props.setView((prev) => {
              return { ...prev, functionView: "add" };
            });
          }}
        >
          <BiBookAdd />
          &nbsp; New
        </NavigationButton>
      ) : (
        <NavigationButton
          onClick={() => {
            props.setView((prev) => {
              return { ...prev, functionView: "" };
            });
          }}
        >
          <BiArrowBack />
          &nbsp; Back
        </NavigationButton>
      )}

      <NavigationButton
        onClick={() => {
          props.toggleOverlay("search");
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
          &nbsp; Copy URL
        </NavigationButton>
      </CopyToClipboard>
      {props.context.jwt || props.context.accessKey ? (
        <NavigationButton
          onClick={() => {
            props.toggleOverlay("settings");
          }}
        >
          <BiCog />
          &nbsp; Settings
        </NavigationButton>
      ) : (
        <NavigationButton
          onClick={() => {
            props.toggleOverlay("accessPrompt");
          }}
        >
          <BiLockOpenAlt />
        </NavigationButton>
      )}

      {props.view.issueView === "cards" && (
        <NavigationButton
          onClick={() => {
            props.setView((prev) => {
              return { ...prev, issueView: "table" };
            });
          }}
        >
          <BiWindows />
        </NavigationButton>
      )}

      {props.view.issueView === "table" && (
        <NavigationButton
          onClick={() => {
            props.setView((prev) => {
              return { ...prev, issueView: "cards" };
            });
          }}
        >
          <BiBorderAll />
        </NavigationButton>
      )}
      <NavigationButton
        onClick={() => {
          props.getDiaryContent(uuid);
        }}
      >
        <BiRevision />
      </NavigationButton>
    </>
  );
}
