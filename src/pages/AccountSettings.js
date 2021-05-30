import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import useLogout from "../hooks/useLogout";

export default function AccountSettings() {
  const logout = useLogout();

  return (
    <SingleColumnLayout>
      <h1>My Account</h1>
      <button onClick={logout}>Logout</button>
    </SingleColumnLayout>
  );
}
