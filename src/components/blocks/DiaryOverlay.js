import FullScreenShade from "../blocks/FullScreenShade";
import SearchPopup from "../overlays/SearchPopup";
import DiarySettingsPopup from "../overlays/DiarySettingsPopup";
import PasscodePrompt from "../overlays/PasscodePrompt";

export default function DiaryOverlay(props) {
  return (
    <>
      {props.overlayStatus === true && props.view.popupView === "search" ? (
        <FullScreenShade styleOverride={{ padding: "1rem" }}>
          <SearchPopup
            exit={props.toggleOverlay}
            toggleViews={props.setView}
            view={props.view}
            modifyResults={props.setDiaryContent}
            updateFilterIndicator={props.setFilters}
          />
        </FullScreenShade>
      ) : null}

      {props.overlayStatus === true && props.view.popupView === "settings" ? (
        <FullScreenShade
          styleOverride={{ padding: "1rem" }}
          clickEvent={props.toggleOverlay}
        >
          <DiarySettingsPopup
            diaryUuid={props.targetDiary.uuid}
            diaryExpiry={props.targetDiary.expiry_date}
            exit={props.toggleOverlay}
            target={(target) => {
              props.setView((prev) => {
                return { ...prev, functionView: target };
              });
            }}
          />
        </FullScreenShade>
      ) : null}

      {props.overlayStatus === true &&
      props.view.popupView === "accessPrompt" ? (
        <FullScreenShade styleOverride={{ padding: "1rem" }}>
          <PasscodePrompt exit={props.toggleOverlay} />
        </FullScreenShade>
      ) : null}
    </>
  );
}
