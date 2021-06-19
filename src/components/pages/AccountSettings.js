import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import useUserFunctions from "../hooks/useUserFunctions";

export default function AccountSettings() {
  const { logoutUser } = useUserFunctions();

  return (
    <SingleColumnLayout>
      <h1>My Account</h1>
      <button onClick={logoutUser}>Logout</button>
    </SingleColumnLayout>
  );
}
