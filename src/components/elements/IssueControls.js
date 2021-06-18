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
} from "react-icons/bi";
import FullScreenShade from "../elements/FullScreenShade";
import useIssueFunctions from "../../hooks/useIssueFunctions";
import IssueControlButton from "./IssueControlButton";

export default function IssueControls(props) {
  const [openStatus, setOpenStatus] = useState(false);
  const { markIssue } = useIssueFunctions();
  const toggleControls = () => {
    openStatus ? setOpenStatus(false) : setOpenStatus(true);
  };

  const mark = async (targetStatus) => {
    await markIssue(targetStatus, props.issueId);
    toggleControls();
    props.refresh();
  };

  const renderControlMenu = (openStatus) => {
    if (openStatus) {
      return (
        <>
          <div className="controls-menu">
            <IssueControlButton
              mark={mark}
              targetStatus={"RESOLVED"}
              currentStatus={props.status}
            >
              <BiListCheck size={25} />
            </IssueControlButton>
            <IssueControlButton
              mark={mark}
              targetStatus={"PRIORITIZED"}
              currentStatus={props.status}
            >
              <BiPin size={25} />
            </IssueControlButton>
            <IssueControlButton
              mark={mark}
              targetStatus={"DELETED"}
              currentStatus={props.status}
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

      <button className="controls-toggle" onClick={toggleControls}>
        <BiMenuAltRight size={25} />
      </button>

      {renderControlMenu(openStatus)}
    </div>
  );
}
