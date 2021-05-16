import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { useState } from "react";
import "./MainRouter.scss";
import TopBar from "./components/layout/TopBar";
import SideNav from "./components/layout/SideNav";

import AccountSettings from "./pages/AccountSettings";
import Diary from "./pages/Diary";
import Diaries from "./pages/Diaries";
import DiarySettings from "./pages/DiarySettings";
import DiarySetup from "./pages/DiarySetup";
import Homepage from "./pages/Homepage";
import Report from "./pages/Report";

export default function MainRouter(props) {
  const [menuState, setMenuToggle] = useState(false);

  const toggleMenu = () => {
    menuState ? setMenuToggle(false) : setMenuToggle(true);
  };

  return (
    <Router>
      <TopBar toggleMenu={toggleMenu} menuState={menuState} />
      <SideNav menuState={menuState}>
        <Link onClick={toggleMenu} to="/">
          Homepage
        </Link>
        <Link onClick={toggleMenu} to="/account">
          My Account
        </Link>
        <Link onClick={toggleMenu} to="/diaries">
          My Diaries
        </Link>
        <Link onClick={toggleMenu} to="/new">
          New Diary
        </Link>
      </SideNav>

      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/account">
          <AccountSettings />
        </Route>
        <Route exact path="/diaries">
          <Diaries />
        </Route>
        <Route exact path="/new">
          <DiarySetup />
        </Route>
      </Switch>
    </Router>
  );
}
