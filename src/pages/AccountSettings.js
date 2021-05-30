import axios from "axios";
import { useHistory } from "react-router";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import { NotificationManager } from "react-notifications";

import { useContext } from "react";
import { UserContext } from "../App";

export default function AccountSettings() {
  const history = useHistory();
  const uinfo = useContext(UserContext);

  const logout = () => {
    axios.post("/api/users/logout").then((resp) => {
      NotificationManager.success("Logged out!");
      uinfo.setUserSession((prev) => {
        return { ...prev, jwt: null };
      });
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
