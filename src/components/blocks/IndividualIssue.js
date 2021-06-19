import TwoColumnLayout from "../layouts/TwoColumnLayout";
import WhiteBgContainer from "../blocks/WhiteBgContainer";
import LinedContainer from "../blocks/LinedContainer";

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
