import "./LoadingIndicator.scss";
import { VscLoading } from "react-icons/vsc";

export default function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <div>
        <VscLoading />
      </div>
    </div>
  );
}
