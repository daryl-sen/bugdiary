import { useHistory } from "react-router-dom";
import axios from "axios";
// context
import { useState } from "react";

// notifications
import { NotificationManager } from "react-notifications";
import { useAppContext } from "../AppContext";

export default function useUserFunctions() {
  const { context, setContext } = useAppContext();
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
              jwt: resp.data.accessToken,
              userId: resp.data.targetUser.id,
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
      setContext((prev) => {
        return {
          ...prev,
          jwt: null,
          name: null,
          authenticatedDiaries: [],
        };
      });
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
        console.log(resp.data);
        if (!resp.data.loggedIn) {
          return setContext((prev) => {
            return {
              ...prev,
              jwt: null,
              authenticatedDiaries: resp.data.authenticatedDiaries,
            };
          });
        }
        return setContext((prev) => {
          return {
            ...prev,
            ...resp.data.userInfo,
            authenticatedDiaries: resp.data.authenticatedDiaries,
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
