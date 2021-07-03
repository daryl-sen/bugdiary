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
const issueStatusCodes = [
  "PRIORITIZED",
  "PENDING",
  "DEFERRED",
  "RESOLVED",
  "DELETED",
];

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
            return {
              ...issue,
              Status: {
                id: targetStatus,
                name: issueStatusCodes[targetStatus - 1],
              },
              status_id: targetStatus,
            };
          }
          return issue;
        }),
      };
    });
    toggleControls();

    if (!(await markIssue(targetStatus, props.issue.uuid))) {
      setDiaryContext((prev) => {
        return {
          ...prev,
          issues: prev.issues.map((issue) => {
            if (issue.uuid === props.issue.uuid) {
              return {
                ...issue,
                Status: { id: props.Status.id, name: props.Status.name },
                status_id: props.Status.id,
              };
            }
            return issue;
          }),
        };
      });
    }
  };

  const renderControlMenu = (openStatus) => {
    if (openStatus) {
      return (
        <>
          <div className="controls-menu">
            <IssueControlButton
              mark={mark}
              targetStatus={4}
              currentStatus={props.issue.status_id}
            >
              <BiListCheck size={25} />
            </IssueControlButton>
            <IssueControlButton
              mark={mark}
              targetStatus={1}
              currentStatus={props.issue.status_id}
            >
              <BiPin size={25} />
            </IssueControlButton>
            <IssueControlButton
              mark={mark}
              targetStatus={5}
              currentStatus={props.issue.status_id}
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
