import "./OverlayContainer.scss";
import FullScreenShade from "./FullScreenShade";

export default function OverlayContainer(props) {
  return (
    <>
      <FullScreenShade clickEvent={props.toggle} />
      <div class="overlay-content">{props.children}</div>
    </>
  );
}
