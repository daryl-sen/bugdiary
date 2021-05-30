import "./SideNav.scss";
import FullScreenShade from "../FullScreenShade";
import { render } from "@testing-library/react";

export default function SideNav(props) {
  const transformInfo = {};

  if (props.menuState) {
    transformInfo.transform = "translate(0px)";
  } else {
    transformInfo.transform = "translate(-300px)";
  }

  const renderShade = () => {
    if (props.menuState) {
      return <FullScreenShade clickEvent={props.setMenuToggle} />;
    }
  };

  return (
    <>
      {renderShade()}
      <nav style={transformInfo}>
        <section id="about-info">Logo</section>
        <section id="links">{props.children}</section>
        <section id="footer">footer</section>
      </nav>
    </>
  );
}
