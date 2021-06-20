import { useState, useEffect } from "react";
import "./MainRouter.scss";
import { useAppContext } from "./AppContext";
import useUserFunctions from "./hooks/useUserFunctions";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TopBar from "./components/layouts/TopBar";
import SideNav from "./components/layouts/SideNav";
import ProtectedRoute from "./ProtectedRoute";
// pages
import Diary from "./components/pages/Diary";
import LoginPage from "./components/pages/LoginPage";
import AccountSettings from "./components/pages/AccountSettings";
import Diaries from "./components/pages/Diaries";
import DiarySetup from "./components/pages/DiarySetup";
import DiaryNew from "./components/pages/DiaryNew";
import Homepage from "./components/pages/Homepage";
import AboutUs from "./components/pages/AboutUs";
import Signup from "./components/pages/Signup";

export default function MainRouter(props) {
  const [menuState, setMenuToggle] = useState(false);
  const { context, setContext } = useAppContext();
  const { checkToken } = useUserFunctions(context);

  useEffect(() => {
    checkToken(setContext);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
