import "./ScrollToTop.scss";
import { BiArrowToTop } from "react-icons/bi";

export default function ScrollToTop() {
  return (
    <button
      id="scroll-to-top"
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <BiArrowToTop size={30} />
    </button>
  );
}
