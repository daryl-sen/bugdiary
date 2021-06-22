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

  const [diaryContext, setDiaryContext] = useState({
    targetDiary: undefined,
    issues: [],
    mode: "show", // "show", "add", "filter", "diarySettings", "diaryModification", "diarySetup"
    config: {
      displayType: "cards",
      showResolved: false,
      showDeleted: false,
      filterTerm: "",
      order: "default",
    },
    selected: [],
  });

  const resetDiaryContext = () => {
    setDiaryContext({
      targetDiary: undefined,
      issues: [],
      mode: "show", // "show", "add", "filter", "diarySettings", "diaryModification", "diarySetup"
      config: {
        displayType: "cards",
        showResolved: false,
        showDeleted: false,
        filterTerm: "",
        order: "default",
      },
      selected: [],
    });
  };

  return (
    <AppContext.Provider value={{ context, setContext }}>
      <DiaryContext.Provider
        value={{ diaryContext, setDiaryContext, resetDiaryContext }}
      >
        {props.children}
      </DiaryContext.Provider>
    </AppContext.Provider>
  );
}
