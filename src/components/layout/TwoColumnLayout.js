import "./TwoColumnLayout.scss";
// import WhiteBgContainer from "../WhiteBgContainer";
import LinedContainer from "../elements/LinedContainer";

export default function TwoColumnLayout(props) {
  return (
    <div className="two-column-layout">
      <main>{props.children || "No content"}</main>
      <aside>
        <LinedContainer>
          <h3>BugDiary</h3>
          <p>Create your own bug diary today! Get started here.</p>
          <button>Sign Up</button>
        </LinedContainer>
        <LinedContainer>
          <h3>Related Issues</h3>
        </LinedContainer>
      </aside>
    </div>
  );
}
