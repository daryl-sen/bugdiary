import SignupForm from "../components/forms/SignupForm";
import WhiteBgContainer from "../components/blocks/WhiteBgContainer";
import { useLocation } from "react-router-dom";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";

export default function Signup(props) {
  const queryParams = useLocation().search;
  const next = new URLSearchParams(queryParams).get("next");

  return (
    <SingleColumnLayout preset="narrow-centered">
      <WhiteBgContainer>
        <h1>Glad to have you!</h1>
        <SignupForm next={next} />
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
