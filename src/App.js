import "./App.scss";
import MainRouter from "./MainRouter";
import axios from "axios";
import { useEffect } from "react";

const BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  const getCookie = () => {
    console.log(BASE_URL);
    const loginInfo = {
      email: "sensworks.ca@gmail.com",
      password: "password",
    };
    axios.post("/api/users/login", loginInfo).then((resp) => {
      console.log("RESPONSE", resp.data);
    });
  };

  return (
    <div className="App" style={{ height: "2000px" }}>
      <MainRouter />
      <button onClick={getCookie}>Click</button>
    </div>
  );
}

export default App;
