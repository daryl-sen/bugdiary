export default function useStandardStyles() {
  const getWindowSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const getColors = (nightMode) => {
    if (nightMode) {
      return {
        primaryColor: "#358bdc",
        primaryColorText: "ffffff",
        secondaryColor: "#ff3939",
        secondaryColorText: "#ffffff",
        lineColor: "#393939",
        backgroundColor: "#393939",
        fontColor: "#ffffff",
      };
    }

    return {
      primaryColor: "#358bdc",
      primaryColorText: "ffffff",
      secondaryColor: "#ff3939",
      secondaryColorText: "#ffffff",
      lineColor: "#393939",
      backgroundColor: "#e6e6e6",
      fontColor: "#000000",
    };
  };

  const getSizes = () => {
    return {
      standardSpacing: "1rem",
      standardCutoff1: "750px",
      standardCutoff2: "400px",
    };
  };

  return {
    getWindowSize,
    getColors,
    getSizes,
  };
}
