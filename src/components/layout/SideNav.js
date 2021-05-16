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
      <section id="about-info">Logo</section>
      <section id="links">{props.children}</section>
      <section id="footer">footer</section>
    </nav>
  );
}
