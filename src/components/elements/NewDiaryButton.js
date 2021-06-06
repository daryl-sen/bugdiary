import "./NewDiaryButton.scss";
import { useHistory } from "react-router-dom";

export default function NewDiaryButton() {
  const history = useHistory();
  const redirectToCreate = () => {
    history.push("/create");
  };

  return (
    <button onClick={redirectToCreate} className="new-diary-button">
      New
    </button>
  );
}
