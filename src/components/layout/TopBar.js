import "./TopBar.scss";
import { CgMenu, CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function TopBar(props) {
  return (
    <header id="top-bar">
      <button id="side-nav-toggle">
        {props.menuState ? (
          <CgClose onClick={props.toggleMenu} />
        ) : (
          <CgMenu onClick={props.toggleMenu} />
        )}
      </button>
      <div id="title">
        <Link to="/">BugDiary.com</Link>
      </div>
    </header>
  );
}
