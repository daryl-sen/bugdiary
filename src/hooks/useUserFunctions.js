import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

// notifications
import { NotificationManager } from "react-notifications";
import { useAppContext } from "../AppContext";

export default function useUserFunctions() {
  const { setContext, resetAppContext } = useAppContext();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const history = useHistory();

  const loginUser = async (email, password, next) => {
    await axios
      .post("/api/users/login", {
        email,
        password,
      })
      .then((resp) => {
        if (resp.data.accessToken) {
          setContext((prev) => {
            return {
              ...prev,
              loggedIn: true,
              jwt: resp.data.accessToken,
              userDetails: resp.data.targetUser,
              userPreferences: resp.data.targetUser.Preferences,
            };
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
      });
  };

  const createUser = async (values, next) => {
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
        .post("/api/users/", {
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
          setContext((prev) => {
            return {
              ...prev,
              loggedIn: true,
              jwt: resp.data.accessToken,
              userDetails: resp.data.newUser,
              userPreferences: resp.data.newUserPreferences,
            };
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
      resetAppContext();
      NotificationManager.success("Logged out!");
      history.push("/");
    });
  };

  const updateUser = () => {};

  const deleteUser = () => {};

  const checkToken = () => {
    console.log("checking token");
    axios
      .get("/api/users/check-token")
      .then((resp) => {
        if (!resp.data.loggedIn) {
          return setContext((prev) => {
            return {
              ...prev,
              loggedIn: false,
              authenticatedDiaries: resp.data.authenticatedDiaries,
              authPasscodeOnly: true,
            };
          });
        }
        return setContext((prev) => {
          return {
            ...prev,
            loggedIn: true,
            userDetails: resp.data.userDetails,
            userPreferences: resp.data.userPreferences,
            authenticatedDiaries: resp.data.authenticatedDiaries,
            jwt: resp.data.jwt,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    loadingStatus,
    setLoadingStatus,
    loginUser,
    logoutUser,
    createUser,
    updateUser,
    deleteUser,
    checkToken,
  };
}
