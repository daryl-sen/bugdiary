import React, { useContext, useState } from "react";
export const DiaryContext = React.createContext();

export function useDiaryContext() {
  return useContext(DiaryContext);
}

export default function DiaryContextProvider(props) {
  const [diaryContext, setDiaryContext] = useState({
    targetDiary: null,
    issues: [],
  });

  return (
    <AppContext.Provider value={{ diaryContext, setDiaryContext }}>
      {props.children}
    </AppContext.Provider>
  );
}
