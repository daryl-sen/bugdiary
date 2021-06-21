import { useState } from "react";
import "./IssueControls.scss";
import {
  // BiLinkExternal,
  // BiCircle,
  BiMenuAltRight,
  BiListCheck,
  BiPin,
  BiTrashAlt,
  BiWindowClose,
  BiHide,
} from "react-icons/bi";
import FullScreenShade from "../blocks/FullScreenShade";
import useIssueFunctions from "../../hooks/useIssueFunctions";
import IssueControlButton from "./IssueControlButton";
import { useDiaryContext } from "../../AppContext";

export default function IssueControls(props) {
  const { setDiaryContext } = useDiaryContext();
  const [openStatus, setOpenStatus] = useState(false);
  const { markIssue } = useIssueFunctions();
  const toggleControls = () => {
    openStatus ? setOpenStatus(false) : setOpenStatus(true);
  };

  const mark = async (targetStatus) => {
    setDiaryContext((prev) => {
      return {
        ...prev,
        issues: prev.issues.map((issue) => {
          if (issue.uuid === props.issue.uuid) {
            return { ...issue, status: targetStatus };
          }
          return issue;
        }),
      };
    });
    toggleControls();
    await markIssue(targetStatus, props.issue.uuid);
  };

  const renderControlMenu = (openStatus) => {
    if (openStatus) {
      return (
        <>
          <div className="controls-menu">
            <IssueControlButton
              mark={mark}
              targetStatus={"RESOLVED"}
              currentStatus={props.issue.status}
            >
              <BiListCheck size={25} />
            </IssueControlButton>
            <IssueControlButton
              mark={mark}
              targetStatus={"PRIORITIZED"}
              currentStatus={props.issue.status}
            >
              <BiPin size={25} />
            </IssueControlButton>
            <IssueControlButton
              mark={mark}
              targetStatus={"DELETED"}
              currentStatus={props.issue.status}
            >
              <BiTrashAlt size={25} />
            </IssueControlButton>
            <IssueControlButton cancel={toggleControls}>
              <BiWindowClose size={25} />
            </IssueControlButton>
          </div>
          <FullScreenShade
            styleOverride={{
              backgroundColor: "rgba(0,0,0,0.05)",
            }}
            clickEvent={toggleControls}
          />
        </>
      );
    }
  };

  return (
    <div className="controls">
      {/* <button className="controls-toggle">
        <BiCircle size={25} />
      </button>

      <button className="controls-toggle">
        <BiLinkExternal size={25} />
      </button> */}

      {props.issue.private ? <BiHide size={25} /> : null}

      <button className="controls-toggle" onClick={toggleControls}>
        <BiMenuAltRight size={25} />
      </button>

      {renderControlMenu(openStatus)}
    </div>
  );
}
