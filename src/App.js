import "./App.scss";
import MainRouter from "./MainRouter";
import axios from "axios";
import { useState } from "react";

const BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  const [jwt, setJwt] = useState(null);

  const getCookie = () => {
    console.log("Getting cookie");
    const loginInfo = {
      email: "sensworks.ca@gmail.com",
      password: "password",
    };
    axios.post("/api/users/login", loginInfo).then((resp) => {
      console.log("RESPONSE", resp.data);
      setJwt(resp.data.accessToken);
    });
  };

  const doAction = () => {
    console.log("Doing something only a logged-in user can do");
    const info = {
      uuid: "uuid",
      display_name: "New Name",
    };
    axios
      .patch("/api/users/user", info)
      .then((resp) => {
        console.log("response", resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showCookieInfo = () => {
    console.log("Fetching cookie info");
  };

  const logout = () => {
    console.log("Logging out");
  };

  const checkToken = () => {
    console.log("Checking jwt");
    axios
      .post("/api/users/check-token")
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App" style={{ height: "2000px" }}>
      <MainRouter />
      <button onClick={getCookie}>Log in and get cookie</button>
      <button onClick={doAction}>Attempt login-required action</button>
      <button onClick={showCookieInfo}>Show cookie info</button>
      <button onClick={logout}>Logout</button>
      <button onClick={checkToken}>Check token</button>
      <p>{jwt}</p>
    </div>
  );
}

export default App;
