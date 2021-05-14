import { useState } from "react";
import "./IssueControls.scss";

export default function IssueControls(props) {
  const [openStatus, setOpenStatus] = useState(false);

  const toggleControls = () => {
    console.log(openStatus);
    openStatus ? setOpenStatus(false) : setOpenStatus(true);
  };

  const renderControlMenu = (openStatus) => {
    console.log("rendering", openStatus);
    if (openStatus) {
      return (
        <div className="controls-menu">
          <button>Resolve</button>
          <button>Pin</button>
          <button>Delete</button>
          <button>Cancel</button>
        </div>
      );
    }
  };

  return (
    <div className="controls">
      <button className="controls-toggle" onClick={toggleControls}>
        Menu
      </button>
      {renderControlMenu(openStatus)}
    </div>
  );
}
