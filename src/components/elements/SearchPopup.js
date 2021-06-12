import "./SearchPopup.scss";
import WhiteBgContainer from "./WhiteBgContainer";

export default function SearchPopup(props) {
  return (
    <WhiteBgContainer preset="narrow">
      <h2>Search and Filter</h2>
      <input type="text" />
      <button
        className="custom"
        onClick={() => {
          props.toggleViews((prev) => {
            if (prev.showResolved) {
              return { ...prev, showResolved: false };
            }
            return { ...prev, showResolved: true };
          });
        }}
      >
        {props.view.showResolved
          ? "Showing Resolved Issues"
          : "Hiding Resolved Issues"}
      </button>
      <button
        className="custom"
        onClick={() => {
          props.toggleViews((prev) => {
            if (prev.showDeleted) {
              return { ...prev, showDeleted: false };
            }
            return { ...prev, showDeleted: true };
          });
        }}
      >
        {props.view.showDeleted
          ? "Showing Deleted Issues"
          : "Hiding Deleted Issues"}
      </button>
      <div className="side-by-side">
        <div>
          <button type="submit" className="button-primary">
            Search
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="button-secondary"
            onClick={props.exit}
          >
            Cancel
          </button>
        </div>
      </div>
    </WhiteBgContainer>
  );
}
