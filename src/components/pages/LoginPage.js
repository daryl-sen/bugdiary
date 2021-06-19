import LoginForm from "../forms/LoginForm";
import WhiteBgContainer from "../blocks/WhiteBgContainer";
import { useLocation } from "react-router-dom";
import SingleColumnLayout from "../layouts/SingleColumnLayout";

export default function LoginPage(props) {
  const queryParams = useLocation().search;
  const next = new URLSearchParams(queryParams).get("next");

  return (
    <SingleColumnLayout preset="narrow-centered">
      <WhiteBgContainer>
        <h1>Welcome Back!</h1>
        <LoginForm next={next} />
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
