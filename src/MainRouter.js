import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useState } from "react";
import "./MainRouter.scss";
import TopBar from "./components/layout/TopBar";
import SideNav from "./components/layout/SideNav";

import ProtectedRoute from "./ProtectedRoute";

import Diary from "./pages/Diary";
// import DiarySettings from "./pages/DiarySettings";
// import Report from "./pages/Report";
import LoginPage from "./pages/LoginPage";
import AccountSettings from "./pages/AccountSettings";
import Diaries from "./pages/Diaries";
import DiarySetup from "./pages/DiarySetup";
import DiaryNew from "./pages/DiaryNew";
import Homepage from "./pages/Homepage";
import AboutUs from "./pages/AboutUs";
import Signup from "./pages/Signup";

export default function MainRouter(props) {
  const [menuState, setMenuToggle] = useState(false);

  const toggleMenu = () => {
    menuState ? setMenuToggle(false) : setMenuToggle(true);
  };

  return (
    <Router>
      <TopBar toggleMenu={toggleMenu} menuState={menuState} />
      <SideNav menuState={menuState} toggleMenu={toggleMenu} />

      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/account">
          <ProtectedRoute target="account">
            <AccountSettings />
          </ProtectedRoute>
        </Route>
        <Route exact path="/diaries">
          <ProtectedRoute target="diaries">
            <Diaries />
          </ProtectedRoute>
        </Route>
        <Route exact path="/diary/:uuid/:functionView?">
          <Diary />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/new">
          <DiaryNew />
        </Route>
        <Route exact path="/setup/:uuid">
          <DiarySetup />
        </Route>
        <Route exact path="/about">
          <AboutUs />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}
