import "./App.scss";
import MainRouter from "./MainRouter";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export const UserContext = React.createContext();

function App() {
  const [userSession, setUserSession] = useState({
    jwt: null,
    name: null,
    theme: "light",
    notifications: [],
  });

  // check for existing cookie containing jwt
  useEffect(() => {
    axios
      .get("/api/users/check-token")
      .then((resp) => {
        setUserSession((prev) => {
          return { ...prev, jwt: resp.data.jwt };
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [userSession.jwt]);

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
