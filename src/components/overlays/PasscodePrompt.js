import WhiteBgContainer from "../blocks/WhiteBgContainer";
import PasscodeAuthForm from "../forms/PasscodeAuthForm";

export default function PasscodePrompt(props) {
  return (
    <WhiteBgContainer preset="narrow">
      <h2>Diary Access</h2>
      <PasscodeAuthForm exit={props.exit} />
      <button onClick={props.exit} className="custom button-secondary">
        Cancel
      </button>
      <p>
        Only the diary's owner or someone with the diary's access code can
        change the diary's settings. Please log in or enter the access code
        below.
      </p>
    </WhiteBgContainer>
  );
}
