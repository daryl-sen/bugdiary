import "./App.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import MainRouter from "./MainRouter";
import LoadingIndicator from "./components/blocks/LoadingIndicator";
import Warning from "./components/Warning";

export const UserContext = React.createContext();

function App() {
  const [userSession, setUserSession] = useState({
    jwt: undefined,
    name: undefined,
    theme: "light",
    notifications: [],
  });
  const [warningDisplay, setWarningDisplay] = useState(true);

  // check for existing cookie containing jwt
  useEffect(() => {
    axios
      .get("/api/users/check-token")
      .then((resp) => {
        if (!resp.data.loggedIn) {
          return setUserSession((prev) => {
            return { ...prev, jwt: null };
          });
        }
        return setUserSession((prev) => {
          return { ...prev, ...resp.data.userInfo };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userSession.jwt]);

  if (userSession.jwt === undefined) {
    return <LoadingIndicator />;
  }

  return (
    <div className="App">
      {warningDisplay && (
        <Warning
          exit={() => {
            setWarningDisplay(false);
          }}
        />
      )}

      <UserContext.Provider value={{ ...userSession, setUserSession }}>
        <NotificationContainer />
        <MainRouter />
      </UserContext.Provider>
    </div>
  );
}

export default App;
