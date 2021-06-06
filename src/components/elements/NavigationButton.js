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
        if (props.target) {
          return redirect(props.target);
        }
        return props.onClick();
      }}
    >
      {props.children}
    </button>
  );
}
