import { useState } from "react";
import "./IssueControls.scss";
import {
  CgMenuMotion,
  CgExpand,
  CgTrashEmpty,
  CgCheckR,
  CgPinAlt,
  CgCloseR,
} from "react-icons/cg";
import FullScreenShade from "../elements/FullScreenShade";
import useIssueFunctions from "../../hooks/useIssueFunctions";

export default function IssueControls(props) {
  const [openStatus, setOpenStatus] = useState(false);

  const { markIssue } = useIssueFunctions();

  const toggleControls = () => {
    openStatus ? setOpenStatus(false) : setOpenStatus(true);
  };

  const renderControlMenu = (openStatus) => {
    if (openStatus) {
      return (
        <>
          <div className="controls-menu">
            <button
              onClick={() => {
                markIssue("RESOLVED", props.issueId);
              }}
            >
              <CgCheckR size={20} />
            </button>
            <button
              onClick={() => {
                markIssue("PRIORITIZED", props.issueId);
              }}
            >
              <CgPinAlt size={20} />
            </button>
            <button
              onClick={() => {
                markIssue("DELETED", props.issueId);
              }}
            >
              <CgTrashEmpty size={20} />
            </button>
            <button onClick={toggleControls}>
              <CgCloseR size={20} />
            </button>
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
      <button className="controls-toggle">
        <CgExpand size={30} />
      </button>
      <button className="controls-toggle" onClick={toggleControls}>
        <CgMenuMotion size={30} />
      </button>
      {renderControlMenu(openStatus)}
    </div>
  );
}
