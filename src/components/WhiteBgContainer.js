import "./WhiteBgContainer.scss";

export default function WhiteBgContainer(props) {
  return (
    <div style={props.styleOverride} className="white-bg-container">
      {props.children}
    </div>
  );
}
