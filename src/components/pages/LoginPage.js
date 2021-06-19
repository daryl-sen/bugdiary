import LoginForm from "../components/forms/LoginForm";
import WhiteBgContainer from "../components/blocks/WhiteBgContainer";
import { useLocation } from "react-router-dom";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";

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
