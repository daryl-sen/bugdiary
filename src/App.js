import "./App.scss";
import MainRouter from "./MainRouter";
import React, { useState } from "react";

import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const BASE_URL = process.env.REACT_APP_API_URL;

export const UserContext = React.createContext();

function App() {
  const [userSession, setUserSession] = useState({
    jwt: null,
    name: null,
    theme: "light",
    notifications: [],
  });

  const testNotification = () => {
    NotificationManager.info("Test notif");
  };

  return (
    <div className="App">
      <UserContext.Provider value={{ ...userSession, setUserSession }}>
        <NotificationContainer />
        <MainRouter />
      </UserContext.Provider>
      JWT:{userSession.jwt}
      <button onClick={testNotification}>test notification</button>
    </div>
  );
}

export default App;
