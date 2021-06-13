import WhiteBgContainer from "./WhiteBgContainer";
export default function PasscodePrompt(props) {
  return (
    <WhiteBgContainer preset="narrow">
      <h2>Diary Access</h2>
      <input type="password" />
      <button type="submit" class="button-primary">
        Get Access
      </button>
      <p>
        Only the diary's owner or someone with the diary's access code can
        change the diary's settings. Please log in or enter the access code
        below.
      </p>
    </WhiteBgContainer>
  );
}
