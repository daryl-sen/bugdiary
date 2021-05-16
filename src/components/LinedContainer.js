import "./LinedContainer.scss";

export default function (props) {
  return (
    <div style={props.styleOverride} className="lined-container">
      {props.children}
    </div>
  );
}
