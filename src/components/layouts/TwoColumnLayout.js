import "./TwoColumnLayout.scss";

export default function TwoColumnLayout(props) {
  let styleOverride;
  if (props.preset) {
    if (props.preset === "confined") {
      styleOverride = {
        maxWidth: "1000px",
        margin: "auto",
      };
    }
  } else {
    styleOverride = props.styleOverride;
  }

  return (
    <div style={styleOverride} className="two-column-layout">
      <main>{props.children || "No content"}</main>
      <aside>{props.aside}</aside>
    </div>
  );
}
