import "./LoadingIndicator.scss";
import { BiLoaderCircle } from "react-icons/bi";

export default function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <div>
        <BiLoaderCircle />
      </div>
    </div>
  );
}
