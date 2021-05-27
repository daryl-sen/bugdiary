import { Redirect } from "react-router-dom";

export default function ProtectedRoute(props) {
  if (!props.jwt) {
    return <Redirect to={"/login?next=" + props.target} />;
  }
  return <>{props.children}</>;
}
