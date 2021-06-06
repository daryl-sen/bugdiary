import "./WhiteBgContainer.scss";

export default function WhiteBgContainer(props) {
  let styleOverride;

  if (props.preset) {
    if (props.preset === "narrow") {
      styleOverride = {
        width: "100%",
        maxWidth: "500px",
        margin: "auto",
      };
    }
  } else {
    styleOverride = props.styleOverride;
  }

  return (
    <div style={styleOverride} className="white-bg-container">
      {props.children}
    </div>
  );
}
