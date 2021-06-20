import "./App.scss";
import React, { useState } from "react";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import MainRouter from "./MainRouter";
import Warning from "./components/Warning";
import AppContextProvider from "./AppContext";

function App() {
  const [warningDisplay, setWarningDisplay] = useState(true);

  return (
    <div className="App">
      {warningDisplay && (
        <Warning
          exit={() => {
            setWarningDisplay(false);
          }}
        />
      )}

      <AppContextProvider>
        <NotificationContainer />
        <MainRouter />
      </AppContextProvider>
    </div>
  );
}

export default App;
