import axios from "axios";
import { useHistory } from "react-router";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import { NotificationManager } from "react-notifications";

export default function AccountSettings() {
  const history = useHistory();

  const logout = () => {
    axios.post("/api/users/logout").then((resp) => {
      NotificationManager.success("Logged out!");
      history.push("/");
    });
  };

  return (
    <SingleColumnLayout>
      <h1>My Account</h1>
      <button onClick={logout}>Logout</button>
    </SingleColumnLayout>
  );
}
