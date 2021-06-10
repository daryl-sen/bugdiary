import { useHistory } from "react-router";
import WhiteBgContainer from "./WhiteBgContainer";

export default function DiarySettingsPopup(props) {
  const history = useHistory();

  return (
    <WhiteBgContainer preset="narrow">
      <h2>Diary Settings</h2>
      <button
        className="custom"
        onClick={() => {
          history.push("/new");
        }}
      >
        Versions, Locations, Types
      </button>
      <button className="custom">Diary Info</button>
      <button className="custom">Privacy Settings</button>
      <button className="custom">Extend Diary Expiry</button>
      <button className="custom button-secondary" onClick={props.exit}>
        Cancel
      </button>
      <p style={{ textAlign: "center" }}>
        Your diary will expire in 3 months if it is inactive.{" "}
      </p>
    </WhiteBgContainer>
  );
}
