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

  const createUser = async (values) => {
    setLoadingStatus(true);
    const unique = await axios
      .get(`/api/users/check-unique?email=${values.email}`)
      .then((resp) => {
        return resp.data.unique;
      })
      .catch((err) => {
        console.log(err);
      });

    if (unique) {
      await axios
        .post("/api/users/user", {
          ...values,
          display_name: values.displayName,
        })
        .then((resp) => {
          if (resp.data.error) {
            NotificationManager.error(
              "An error has occurred, we're figuring out what!"
            );
            return;
          }
          // automatically log the user in
          uInfo.setUserSession((prev) => {
            return { ...prev, jwt: resp.data.accessToken };
          });

          NotificationManager.success("Welcome to BugDiary.com!");
          history.push("/" + (next || "diaries"));
        });
    } else {
      setLoadingStatus(false);
      NotificationManager.error("This email is already in use.");
    }
  };
  const logoutUser = () => {
    axios.post("/api/users/logout").then((resp) => {
      NotificationManager.success("Logged out!");
      uInfo.setUserSession((prev) => {
        return { ...prev, jwt: null };
      });
      history.push("/");
    });
  };

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
    uInfo,
  };
}
