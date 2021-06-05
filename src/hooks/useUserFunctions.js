import LoadingIndicator from "../components/LoadingIndicator";
import { useHistory } from "react-router-dom";
import axios from "axios";
// context
import { useContext, useState } from "react";
import { UserContext } from "../App";
// notifications
import { NotificationManager } from "react-notifications";

export default function useUserFunctions(next) {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const history = useHistory();
  const uInfo = useContext(UserContext);

  const loginUser = async (email, password) => {
    setLoadingStatus(true);

    const accessToken = await axios
      .post("/api/users/login", {
        email,
        password,
      })
      .then((resp) => {
        if (resp.data.accessToken) {
          return resp.data.accessToken;
        }
        return null;
      });

    if (accessToken) {
      uInfo.setUserSession((prev) => {
        return { ...prev, jwt: accessToken };
      });
      NotificationManager.success("Welcome back!", "Logged In");
      history.push("/" + (next || "diaries"));
    } else {
      setLoadingStatus(false);
      NotificationManager.error(
        "User or password is incorrect.",
        "Login Failed"
      );
    }
  };

  const logoutUser = () => {};
  const createUser = () => {};
  const updateUser = () => {};
  const deleteUser = () => {};

  return {
    loadingStatus,
    setLoadingStatus,
    loginUser,
    logoutUser,
    createUser,
    updateUser,
    deleteUser,
  };
}
