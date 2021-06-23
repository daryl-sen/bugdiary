import SingleColumnLayout from "../layouts/SingleColumnLayout";
import useUserFunctions from "../../hooks/useUserFunctions";
import WhiteBgContainer from "../blocks/WhiteBgContainer";

export default function AccountSettings() {
  const { logoutUser } = useUserFunctions();

  return (
    <SingleColumnLayout preset="narrow-centered">
      <WhiteBgContainer>
        <h1>My Account</h1>
        <p>Account management features are coming soon!</p>
        <button onClick={logoutUser} className="custom button-secondary">
          Logout
        </button>
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
