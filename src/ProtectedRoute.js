import { Redirect } from "react-router-dom";
import { useAppContext } from "./AppContext";

export default function ProtectedRoute(props) {
  const { context } = useAppContext();

  if (!context.jwt) {
    console.log(context);
    return <Redirect to={"/login?next=" + props.target} />;
  } else {
    return <>{props.children}</>;
  }
}
