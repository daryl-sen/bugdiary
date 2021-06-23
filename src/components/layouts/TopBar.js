import "./TopBar.scss";
import { CgMenu, CgClose } from "react-icons/cg";
import { useAppContext } from "../../AppContext";
import { useHistory } from "react-router";

export default function TopBar(props) {
  const history = useHistory();
  const { context } = useAppContext();

  return (
    <header id="top-bar">
      <button id="side-nav-toggle">
        {props.menuState ? (
          <CgClose onClick={props.toggleMenu} />
        ) : (
          <CgMenu onClick={props.toggleMenu} />
        )}
      </button>
      <button
        id="title"
        onClick={() => {
          return history.push(context.jwt ? "/diaries" : "/");
        }}
      >
        BugDiary.com
      </button>
    </header>
  );
}
