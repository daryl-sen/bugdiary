import "./TwoColumnLayout.scss";

export default function TwoColumnLayout(props) {
  return (
    <div className="two-column-layout">
      <main>{props.children || "No content"}</main>
      <aside>
        <div className="lined-block">
          <h3>BugDiary</h3>
          <p>Create your own bug diary today! Get started here.</p>
          <button>Sign Up</button>
        </div>
        <div className="lined-block">
          <h3>Related Issues</h3>
        </div>
      </aside>
    </div>
  );
}
