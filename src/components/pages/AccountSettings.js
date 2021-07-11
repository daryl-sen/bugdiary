import SingleColumnLayout from "../layouts/SingleColumnLayout";
import useUserFunctions from "../../hooks/useUserFunctions";
import WhiteBgContainer from "../blocks/WhiteBgContainer";
import { useAppContext } from "../../AppContext";

export default function AccountSettings() {
  const { logoutUser } = useUserFunctions();
  const { context } = useAppContext();

  return (
    <SingleColumnLayout preset="narrow-centered">
      <WhiteBgContainer>
        <h1>My Account</h1>
        <p>Welcome back, <b>{context.userDetails.display_name}!</b></p>
        <p>Account management features are coming soon!</p>
        <button onClick={logoutUser} className="custom button-secondary">
          Logout
        </button>
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
