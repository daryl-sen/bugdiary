import WhiteBgContainer from "./WhiteBgContainer";

export default function DiarySettingsMenu(props) {
  return (
    <WhiteBgContainer preset="narrow">
      <h2>Diary Settings</h2>
      <button className="custom">Versions, Locations, Types</button>
      <button className="custom">Diary Info</button>
      <button className="custom">Privacy Settings</button>
      <button className="custom">Extend Diary Expiry</button>
      <button className="custom">Delete Diary</button>
      <button className="custom button-secondary" onClick={props.exit}>
        Cancel
      </button>
    </WhiteBgContainer>
  );
}
