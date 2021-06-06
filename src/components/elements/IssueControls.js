import { useState } from "react";
import "./IssueControls.scss";
import { CgMenuMotion } from "react-icons/cg";
import FullScreenShade from "../elements/FullScreenShade";

export default function IssueControls(props) {
  const [openStatus, setOpenStatus] = useState(false);

  const toggleControls = () => {
    openStatus ? setOpenStatus(false) : setOpenStatus(true);
  };

  const renderControlMenu = (openStatus) => {
    if (openStatus) {
      return (
        <>
          <div className="controls-menu">
            <button>Resolve</button>
            <button>Pin</button>
            <button>Delete</button>
            <button onClick={toggleControls}>Cancel</button>
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
      <button className="controls-toggle" onClick={toggleControls}>
        <CgMenuMotion size={30} />
      </button>
      {renderControlMenu(openStatus)}
    </div>
  );
}
