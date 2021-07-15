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
import useRecents from "../../hooks/useRecents";
// import { useAppContext } from "../../AppContext";

export default function SideNav(props) {
  const transformInfo = {};
  const { logoutUser } = useUserFunctions();
  const { getRecents, clearRecents } = useRecents();

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
    const recentDiaries = getRecents();
    if (recentDiaries) {
      return recentDiaries.map((diary) => {
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
          <Link
            onClick={() => {
              logoutUser();
              props.toggleMenu();
            }}
            to="/"
            data-testid={"logout-button"}
          >
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
          <h2>Recents</h2>
          {renderRecentDiaries()}
          <button
            id="clear-recents-button"
            onClick={() => {
              clearRecents();
              props.toggleMenu();
            }}
          >
            Clear
          </button>
        </section>
        <section id="footer">&copy; Sen Tang, 2020-2021</section>
      </nav>
    </>
  );
}
