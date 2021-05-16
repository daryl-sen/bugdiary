import "./SideNav.scss";

export default function SideNav(props) {
  const transformInfo = {};

  if (props.menuState) {
    transformInfo.transform = "translate(0px)";
  } else {
    transformInfo.transform = "translate(-300px)";
  }

  return (
    <nav style={transformInfo}>
      <div>Logo</div>
      <div>{props.children}</div>
      <div>footer</div>
    </nav>
  );
}
