import { useEffect, useState } from "react";
import axios from "axios";

export default function useJwt() {
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    axios
      .get("/api/users/check-token")
      .then((resp) => {
        // console.log(resp.data.jwt);
        setJwt(resp.data.jwt);
      })
      .catch((err) => {
        // console.log(err.response.data);
      });
  }, [jwt]);

  return jwt;
}
