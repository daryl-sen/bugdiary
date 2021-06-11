import { useHistory } from "react-router";
import WhiteBgContainer from "./WhiteBgContainer";
import useDiaryFunctions from "../../hooks/useDiaryFunctions";
import { NotificationManager } from "react-notifications";

export default function DiarySettingsPopup(props) {
  const history = useHistory();
  const { extendExpiry } = useDiaryFunctions();

  return (
    <WhiteBgContainer preset="narrow">
      <h2>Diary Settings</h2>
      <button
        className="custom"
        onClick={() => {
          history.push("/setup/" + props.diaryUuid);
        }}
      >
        Versions, Locations, Types
      </button>
      <button
        className="custom"
        onClick={() => {
          props.target("diaryInfo");
        }}
      >
        Diary Info, Privacy, Ownership
      </button>
      <button
        className="custom"
        onClick={() => {
          extendExpiry(props.diaryUuid);
          NotificationManager.success(
            "Your diary's expiry data has been extended to 3 months from now."
          );
        }}
      >
        Extend Diary Expiry
      </button>
      <button className="custom button-secondary" onClick={props.exit}>
        Cancel
      </button>
      <p style={{ textAlign: "center" }}>
        Your diary will expire in 3 months if it is inactive.{" "}
      </p>
    </WhiteBgContainer>
  );
}
