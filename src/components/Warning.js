import "./Warning.scss";

export default function Warning(props) {
  return (
    <div className="persistent-warning">
      This software is currently in the alpha testing stage. Some features may
      be unavailable or work in unexpected ways. Any data you create may be
      deleted when the testing phase ends. <b>USE AT YOUR OWN RISK</b>!{" "}
      <button onClick={props.exit}>Dismiss</button>
    </div>
  );
}
