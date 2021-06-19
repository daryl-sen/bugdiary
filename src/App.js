import "./App.scss";
import React, { useState, useEffect } from "react";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import MainRouter from "./MainRouter";
import LoadingIndicator from "./components/blocks/LoadingIndicator";
import Warning from "./components/Warning";
import useUserFunctions from "./hooks/useUserFunctions";

export const UserContext = React.createContext();

function App() {
  const [userSession, setUserSession] = useState({
    jwt: undefined,
    name: undefined,
    theme: "light",
    notifications: [],
  });
  const [warningDisplay, setWarningDisplay] = useState(true);
  const { checkToken } = useUserFunctions();

  // check for existing cookie containing jwt
  useEffect(() => {
    checkToken(setUserSession);
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
