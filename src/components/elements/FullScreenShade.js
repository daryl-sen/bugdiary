import "./FullScreenShade.scss";

export default function FullScreenShade(props) {
  return (
    <div
      id="fullscreen-shade"
      style={props.styleOverride}
      onClick={props.clickEvent}
    ></div>
  );
}
