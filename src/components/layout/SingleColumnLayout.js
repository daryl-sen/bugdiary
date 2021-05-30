import "./SingleColumnLayout.scss";

export default function SingleColumnLayout(props) {
  return (
    <div style={props.styleOverride} className="single-column">
      {props.children}
    </div>
  );
}
