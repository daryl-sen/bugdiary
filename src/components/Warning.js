import "./Warning.scss";

export default function Warning(props) {
  return (
    <div className="persistent-warning">
      This software is currently in the beta testing stage. Some features may be
      unavailable or work in unexpected ways.
      <button onClick={props.exit}>Dismiss</button>
    </div>
  );
}
