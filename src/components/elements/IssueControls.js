import { useState } from "react";
import "./IssueControls.scss";
import {
  BiLinkExternal,
  BiCircle,
  BiMenuAltRight,
  BiListCheck,
  BiPin,
  BiTrashAlt,
  BiWindowClose,
} from "react-icons/bi";
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
              onClick={async () => {
                await markIssue("RESOLVED", props.issueId);
                toggleControls();
                props.refresh();
              }}
            >
              <BiListCheck size={25} />
            </button>
            <button
              onClick={async () => {
                await markIssue("PRIORITIZED", props.issueId);
                toggleControls();
                props.refresh();
              }}
            >
              <BiPin size={25} />
            </button>
            <button
              onClick={async () => {
                await markIssue("DELETED", props.issueId);
                toggleControls();
                props.refresh();
              }}
            >
              <BiTrashAlt size={25} />
            </button>
            <button onClick={toggleControls}>
              <BiWindowClose size={25} />
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
        <BiCircle size={25} />
      </button>

      <button className="controls-toggle">
        <BiLinkExternal size={25} />
      </button>

      <button className="controls-toggle" onClick={toggleControls}>
        <BiMenuAltRight size={25} />
      </button>

      {renderControlMenu(openStatus)}
    </div>
  );
}
