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

  // console.log(props)

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
          mode: "passcodePrompt",
          issues: prev.issues.map((issue) => {
            if (issue.uuid === props.issue.uuid) {
              console.log("props.Status.id", props.issue.Status.id);
              return {
                ...issue,
                Status: {
                  id: props.issue.Status.id,
                  name: props.issue.Status.name,
                },
                status_id: props.issue.Status.id,
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
              testId={"resolve-button"}
            >
              <BiListCheck size={25} />
            </IssueControlButton>
            <IssueControlButton
              mark={mark}
              targetStatus={1}
              currentStatus={props.issue.status_id}
              testId={"pin-button"}
            >
              <BiPin size={25} />
            </IssueControlButton>
            <IssueControlButton
              mark={mark}
              targetStatus={5}
              currentStatus={props.issue.status_id}
              testId={"delete-button"}
            >
              <BiTrashAlt size={25} />
            </IssueControlButton>
            <IssueControlButton
              cancel={toggleControls}
              testId={"cancel-button"}
            >
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

      {props.issue.private ? (
        <BiHide data-testid={"private-icon"} size={25} />
      ) : null}

      <button className="controls-toggle" onClick={toggleControls}>
        <BiMenuAltRight size={25} />
      </button>

      {renderControlMenu(openStatus)}
    </div>
  );
}
