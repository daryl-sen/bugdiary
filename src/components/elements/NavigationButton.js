import "./NavigationButton.scss";
import { useHistory } from "react-router-dom";

export default function NavigationButton(props) {
  const history = useHistory();

  const redirect = (target) => {
    history.push(target);
  };
  return (
    <button
      className="navigation-button"
      onClick={() => {
        redirect(props.target);
      }}
    >
      {props.children}
    </button>
  );
}
