import axios from "axios";
import { useEffect, useState } from "react";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";

import { useContext } from "react";
import { UserContext } from "../App";

export default function Diaries() {
  const [diaries, setDiaries] = useState(null);
  const uinfo = useContext(UserContext);

  useEffect(() => {
    const data = {};
    const authorization = { headers: { authorization: `Bearer ${uinfo.jwt}` } };
    axios
      .get("/api/diaries/", authorization)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <SingleColumnLayout>
      <h1>My Bug Diaries</h1>
    </SingleColumnLayout>
  );
}
