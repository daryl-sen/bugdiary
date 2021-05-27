import LoginForm from "../components/forms/LoginForm";
import TwoColumnLayout from "../components/layout/TwoColumnLayout";
import WhiteBgContainer from "../components/WhiteBgContainer";

export default function LoginPage(props) {
  return (
    <main>
      <TwoColumnLayout>
        <WhiteBgContainer>
          <h1>Welcome Back!</h1>
          <LoginForm />
        </WhiteBgContainer>
      </TwoColumnLayout>
    </main>
  );
}
