import "./SingleColumnLayout.scss";

export default function SingleColumnLayout(props) {
  let styleOverride;

  if (props.preset) {
    if (props.preset === "narrow-centered") {
      styleOverride = {
        maxWidth: "500px",
        margin: "auto",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      };
    } else if (props.preset === "centered") {
      styleOverride = {
        textAlign: "center",
      };
    }
  } else {
    styleOverride = props.styleOverride;
  }

  return (
    <div style={styleOverride} className="single-column">
      {props.children}
    </div>
  );
}
