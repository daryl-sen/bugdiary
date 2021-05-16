import { useState } from "react";
import "./MainRouter.scss";
import TopBar from "./components/layout/TopBar";
import SideNav from "./components/layout/SideNav";

export default function MainRouter(props) {
  const [menuToggle, setMenuToggle] = useState(false);

  const toggleMenu = () => {
    menuToggle ? setMenuToggle(false) : setMenuToggle(true);
  };

  return (
    <>
      <TopBar toggleMenu={toggleMenu} />
      <SideNav />
      <main>
        <h1>Hello</h1>
      </main>
    </>
  );
}
