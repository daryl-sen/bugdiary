import "./TopBar.scss";
import { CgMenu } from "react-icons/cg";

export default function TopBar(props) {
  return (
    <header id="top-bar">
      <button id="side-nav-toggle">
        <CgMenu onClick={props.toggleMenu} />
      </button>
      <div id="title">BugDiary.com</div>
    </header>
  );
}
