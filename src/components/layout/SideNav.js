import "./SideNav.scss";
import FullScreenShade from "../FullScreenShade";
import {
  BiLogOut,
  BiLogIn,
  BiUser,
  BiBookAdd,
  BiBookAlt,
} from "react-icons/bi";
import { Link } from "react-router-dom";

export default function SideNav(props) {
  const transformInfo = {};

  if (props.menuState) {
    transformInfo.transform = "translate(0px)";
  } else {
    transformInfo.transform = "translate(-300px)";
  }

  const renderShade = () => {
    if (props.menuState) {
      return <FullScreenShade clickEvent={props.toggleMenu} />;
    }
  };

  return (
    <>
      {renderShade()}
      <nav style={transformInfo}>
        <section id="about-info">Logo</section>
        <section id="links">
          <Link onClick={props.toggleMenu} to="/">
            Home
          </Link>
          <Link onClick={props.toggleMenu} to="/">
            About
          </Link>
          <Link onClick={props.toggleMenu} to="/">
            My Diaries
          </Link>
          <Link onClick={props.toggleMenu} to="/">
            Settings
          </Link>
          <hr />
          <Link onClick={props.toggleMenu} to="/">
            My First Diary
          </Link>
          <Link onClick={props.toggleMenu} to="/">
            Diary #2
          </Link>
        </section>
        <section id="footer">
          <Link onClick={props.toggleMenu} to="/new">
            <BiBookAdd />
          </Link>
          <Link onClick={props.toggleMenu} to="/diaries">
            <BiBookAlt />
          </Link>
          <Link onClick={props.toggleMenu} to="/account">
            <BiUser />
          </Link>
          <Link onClick={props.toggleMenu} to="">
            <BiLogOut />
          </Link>
          {/* <BiLogIn /> */}
        </section>
      </nav>
    </>
  );
}
