import React, { useContext, useState } from "react";
export const AppContext = React.createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export default function AppContextProvider(props) {
  const [context, setContext] = useState({
    jwt: undefined,
    name: undefined,
    theme: "light",
    notifications: [],
  });

  return (
    <AppContext.Provider value={{ context, setContext }}>
      {props.children}
    </AppContext.Provider>
  );
}
