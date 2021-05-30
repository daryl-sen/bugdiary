import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./App";

export default function ProtectedRoute(props) {
  const uinfo = useContext(UserContext);

  if (!uinfo.jwt) {
    return <Redirect to={"/login?next=" + props.target} />;
  } else {
    return <>{props.children}</>;
  }
}
