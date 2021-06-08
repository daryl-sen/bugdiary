import "./SingleColumnLayout.scss";

export default function SingleColumnLayout(props) {
  let styleOverride;

  if (props.preset) {
    if (props.preset === "narrow-centered") {
      styleOverride = {
        maxWidth: "500px",
        margin: "auto",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
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
