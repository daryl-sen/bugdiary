import "./SideNav.scss";
import FullScreenShade from "../blocks/FullScreenShade";
import {
  BiLogOut,
  BiLogIn,
  BiUser,
  BiBookAdd,
  BiBookAlt,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import useUserFunctions from "../../hooks/useUserFunctions";
import { useAppContext } from "../../AppContext";

export default function SideNav(props) {
  const transformInfo = {};
  const { logoutUser } = useUserFunctions();

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
        <section id="nav-icons">
          <Link onClick={props.toggleMenu} to="/new">
            <BiBookAdd />
          </Link>
          <Link onClick={props.toggleMenu} to="/diaries">
            <BiBookAlt />
          </Link>
          <Link onClick={props.toggleMenu} to="/account">
            <BiUser />
          </Link>
          <Link onClick={logoutUser} to="/">
            <BiLogOut />
          </Link>
          {false ? <BiLogIn /> : null}
        </section>
        <section id="links">
          <Link onClick={props.toggleMenu} to="/about">
            About Us
          </Link>
          <Link onClick={props.toggleMenu} to="/diaries">
            My Diaries
          </Link>
          <Link onClick={props.toggleMenu} to="/account">
            Settings
          </Link>
          <hr />
          {/* <Link onClick={props.toggleMenu} to="/diary/testdiary1">
            My First Diary
          </Link>
          <Link onClick={props.toggleMenu} to="/diary/testdiary2">
            Diary #2
          </Link> */}
        </section>
        <section id="footer">&copy; Sen Tang, 2020-2021</section>
      </nav>
    </>
  );
}
