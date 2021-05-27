import "./App.scss";
import MainRouter from "./MainRouter";
import React, { useState } from "react";

const BASE_URL = process.env.REACT_APP_API_URL;

export const UserContext = React.createContext();

function App() {
  const [userSession, setUserSession] = useState({
    jwt: null,
    name: null,
    theme: "light",
    notifications: [],
  });

  return (
    <div className="App">
      <UserContext.Provider value={{ ...userSession, setUserSession }}>
        <MainRouter />
      </UserContext.Provider>
      JWT:{userSession.jwt}
    </div>
  );
}

export default App;
