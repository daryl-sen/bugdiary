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
// import { useAppContext } from "../../AppContext";

export default function SideNav(props) {
  const transformInfo = {};
  const { logoutUser } = useUserFunctions();
  // const { context } = useAppContext();

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

  const renderRecentDiaries = () => {
    const storedRecentDiaries = localStorage.getItem("recentDiaries");
    if (storedRecentDiaries) {
      const recentDiaries = JSON.parse(localStorage.getItem("recentDiaries"));
      const last3 = recentDiaries.slice(
        recentDiaries.length - 3,
      );
      return last3.map((diary) => {
        return (
          <Link key={diary[1]} to={"/diary/" + diary[1]}>
            {diary[0]}
          </Link>
        );
      });
    }
  };

  return (
    <>
      {renderShade()}
      <nav style={transformInfo}>
        <section id="nav-icons">
          <Link
            onClick={props.toggleMenu}
            to="/new"
            data-testid={"new-diary-shortcut-button"}
          >
            <BiBookAdd />
          </Link>
          <Link
            onClick={props.toggleMenu}
            to="/diaries"
            data-testid={"my-diaries-shortcut-button"}
          >
            <BiBookAlt />
          </Link>
          <Link
            onClick={props.toggleMenu}
            to="/account"
            data-testid={"my-account-shortcut-button"}
          >
            <BiUser />
          </Link>
          <Link onClick={logoutUser} to="/" data-testid={"logout-button"}>
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
          {renderRecentDiaries()}
        </section>
        <section id="footer">&copy; Sen Tang, 2020-2021</section>
      </nav>
    </>
  );
}
