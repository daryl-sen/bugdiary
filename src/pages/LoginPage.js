import LoginForm from "../components/forms/LoginForm";
import WhiteBgContainer from "../components/WhiteBgContainer";
import TwoColumnEqual from "../components/layout/TwoColumnEqual";
import { useLocation } from "react-router-dom";

export default function LoginPage(props) {
  const queryParams = useLocation().search;
  const next = new URLSearchParams(queryParams).get("next");

  return (
    <TwoColumnEqual>
      <WhiteBgContainer>
        <h1>Welcome Back!</h1>
        <LoginForm next={next} />
      </WhiteBgContainer>
      <div>Hello</div>
    </TwoColumnEqual>
  );
}
