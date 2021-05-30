import LoginForm from "../components/forms/LoginForm";
import WhiteBgContainer from "../components/WhiteBgContainer";
import TwoColumnEqual from "../components/layout/TwoColumnEqual";

export default function LoginPage(props) {
  return (
    <TwoColumnEqual>
      <WhiteBgContainer>
        <h1>Welcome Back!</h1>
        <LoginForm />
      </WhiteBgContainer>
      <div>Hello</div>
    </TwoColumnEqual>
  );
}
