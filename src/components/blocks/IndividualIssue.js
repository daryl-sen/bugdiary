import TwoColumnLayout from "../layout/TwoColumnLayout";
import WhiteBgContainer from "../elements/WhiteBgContainer";
import LinedContainer from "../elements/LinedContainer";

export default function IndividualIssue(props) {
  return (
    <TwoColumnLayout
      preset="confined"
      aside={
        <LinedContainer styleOverride={{ backgroundColor: "white" }}>
          Hello
        </LinedContainer>
      }
    >
      <WhiteBgContainer>
        <h2>Issue #77787</h2>
      </WhiteBgContainer>
    </TwoColumnLayout>
  );
}
