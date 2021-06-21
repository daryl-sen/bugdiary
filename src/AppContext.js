import React, { useContext, useState } from "react";
export const AppContext = React.createContext();
export const DiaryContext = React.createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function useDiaryContext() {
  return useContext(DiaryContext);
}

export default function AppContextProvider(props) {
  const [context, setContext] = useState({
    jwt: undefined,
    name: undefined,
    theme: "light",
    authenticatedDiaries: [],
  });

  const [diaryContext, setDiaryContext] = useState({});

  return (
    <AppContext.Provider value={{ context, setContext }}>
      <DiaryContext.Provider value={{ diaryContext, setDiaryContext }}>
        {props.children}
      </DiaryContext.Provider>
    </AppContext.Provider>
  );
}
