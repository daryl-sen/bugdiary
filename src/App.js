import "./App.scss";
import MainRouter from "./MainRouter";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import LoadingIndicator from "./components/LoadingIndicator";

export const UserContext = React.createContext();

function App() {
  const [userSession, setUserSession] = useState({
    jwt: undefined,
    name: undefined,
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
        setUserSession((prev) => {
          return { ...prev, jwt: null };
        });
      });
  }, [userSession.jwt]);

  if (userSession.jwt === undefined) {
    return <LoadingIndicator />;
  }

  const testNotification = () => {
    NotificationManager.info("Test notif");
  };

  return (
    <div className="App">
      <UserContext.Provider value={{ ...userSession, setUserSession }}>
        <NotificationContainer />
        <MainRouter />
      </UserContext.Provider>
      {/* JWT:{userSession.jwt} */}
      <button onClick={testNotification}>test notification</button>
    </div>
  );
}

export default App;
