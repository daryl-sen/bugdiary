import "./App.scss";
import MainRouter from "./MainRouter";
import axios from "axios";
import { useEffect } from "react";

function App() {
  // quick jwt test
  useEffect(() => {
    const payload = {
      uuid: "uuid",
      display_name: "Daryl",
    };
    const token = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGFyeWwiLCJ1dWlkIjoidXVpZCIsImlhdCI6MTYyMTczOTM1Mn0._kMj9cFyvqz9rzyTY3TsM-VbyuvKgS_Gl72N52vGgJw`,
      },
    };
    axios
      .patch("http://localhost:3000/api/users/user", payload, token)
      .then((response) => {
        console.log(response);
      });
  }, []);
  return (
    <div className="App" style={{ height: "2000px" }}>
      <MainRouter />
    </div>
  );
}

export default App;
