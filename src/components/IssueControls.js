import { useState } from "react";
import "./IssueControls.scss";

export default function IssueControls(props) {
  const [openStatus, setOpenStatus] = useState(false);

  const toggleControls = () => {
    openStatus ? setOpenStatus(true) : setOpenStatus(false);
  };

  const renderControlMenu = () => {};

  if (openStatus) {
    return (
      <div className="controls">
        <button className="controls-toggle">Menu</button>
      </div>
    );
  }

  return (
    <div className="controls">
      <button className="controls-toggle">Menu</button>
    </div>
  );
}
