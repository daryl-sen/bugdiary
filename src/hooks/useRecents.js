export default function useRecents() {
  const getRecents = () => {
    const storedRecentDiaries = localStorage.getItem("recentDiaries");
    if (storedRecentDiaries) return JSON.parse(storedRecentDiaries);
  };

  const updateRecents = (targetDiary) => {
    const currentDiary = [targetDiary.name, targetDiary.uuid];

    const storedRecentDiaries = localStorage.getItem("recentDiaries");
    if (storedRecentDiaries) {
      if (!storedRecentDiaries.includes(targetDiary.uuid)) {
        let recentDiaries = JSON.parse(storedRecentDiaries);
        if (recentDiaries.length > 3) {
          recentDiaries = recentDiaries.slice(1);
          console.log(recentDiaries);
        }
        recentDiaries.push(currentDiary);
        localStorage.recentDiaries = JSON.stringify(recentDiaries);
      }
    } else {
      localStorage.recentDiaries = JSON.stringify([currentDiary]);
    }
  };

  const clearRecents = () => {
    localStorage.clear();
  };

  return {
    updateRecents,
    clearRecents,
    getRecents,
  };
}
