import "./App.scss";
import React, { useState, useEffect } from "react";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import MainRouter from "./MainRouter";
import LoadingIndicator from "./components/blocks/LoadingIndicator";
import Warning from "./components/Warning";
import useUserFunctions from "./hooks/useUserFunctions";

import AppContextProvider, { useAppContext } from "./AppContext";

function App() {
  const [warningDisplay, setWarningDisplay] = useState(true);
  // const { checkToken } = useUserFunctions();
  // const { context, setContext } = useAppContext();

  // useEffect(() => {
  //   checkToken(setContext);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // if (context.jwt === undefined) {
  //   return <LoadingIndicator />;
  // }

  return (
    <div className="App">
      {/* {warningDisplay && (
        <Warning
          exit={() => {
            setWarningDisplay(false);
          }}
        />
      )} */}

      <AppContextProvider>
        <NotificationContainer />
        <MainRouter />
      </AppContextProvider>
    </div>
  );
}

export default App;
