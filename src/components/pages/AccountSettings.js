import SingleColumnLayout from "../layouts/SingleColumnLayout";
import useUserFunctions from "../../hooks/useUserFunctions";
import { useAppContext } from "../../AppContext";

export default function AccountSettings() {
  const { context, setContext } = useAppContext();
  const { logoutUser } = useUserFunctions(context, setContext);

  return (
    <SingleColumnLayout>
      <h1>My Account</h1>
      <button onClick={logoutUser}>Logout</button>
    </SingleColumnLayout>
  );
}
