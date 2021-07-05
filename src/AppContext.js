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
  const defaultAppContext = {
    loggedIn: undefined,
    jwt: undefined,
    userDetails: {
      uuid: undefined,
      display_name: undefined,
      id: undefined,
    },
    userPreferences: {
      nightModeOverride: undefined,
    },
    authenticatedDiaries: [],
  };

  const defaultDiaryContext = {
    targetDiary: undefined,
    issues: [],
    mode: "show", // "show", "add", "filter", "diarySettings", "diaryModification", "diarySetup", "passcodePrompt"
    config: {
      displayType: "cards",
      showResolved: false,
      showDeleted: false,
      filterTerm: "",
      order: "default",
    },
    selected: [],
  };

  const [context, setContext] = useState(defaultAppContext);
  const resetAppContext = () => {
    setContext(defaultAppContext);
  };

  const [diaryContext, setDiaryContext] = useState(defaultDiaryContext);
  const resetDiaryContext = () => {
    setDiaryContext(defaultDiaryContext);
  };

  return (
    <AppContext.Provider value={{ context, setContext, resetAppContext }}>
      <DiaryContext.Provider
        value={{ diaryContext, setDiaryContext, resetDiaryContext }}
      >
        {props.children}
      </DiaryContext.Provider>
    </AppContext.Provider>
  );
}
