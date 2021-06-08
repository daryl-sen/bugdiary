import "./TwoColumnLayout.scss";
// import WhiteBgContainer from "../WhiteBgContainer";
import LinedContainer from "../elements/LinedContainer";

export default function TwoColumnLayout(props) {
  let styleOverride;
  if (props.preset) {
    if (props.preset === "confined") {
      styleOverride = {
        maxWidth: "800px",
        margin: "auto",
      };
    }
  } else {
    styleOverride = props.styleOverride;
  }

  console.log(props.children);
  return (
    <div style={styleOverride} className="two-column-layout">
      <main>{props.children || "No content"}</main>
      <aside>{props.aside}</aside>
    </div>
  );
}
