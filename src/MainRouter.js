import { useState } from "react";
import "./MainRouter.scss";
import TopBar from "./components/layout/TopBar";
import SideNav from "./components/layout/SideNav";

export default function MainRouter(props) {
  const [menuState, setMenuToggle] = useState(false);

  const toggleMenu = () => {
    menuState ? setMenuToggle(false) : setMenuToggle(true);
  };

  return (
    <>
      <TopBar toggleMenu={toggleMenu} menuState={menuState} />
      <SideNav menuState={menuState} />
      <main>
        <h1>Hello</h1>
      </main>
    </>
  );
}
