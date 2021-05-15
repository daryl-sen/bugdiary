import "./TwoColumnLayout.scss";

export default function TwoColumnLayout(props) {
  return (
    <div className="two-column-layout">
      <main>
        <div className="bg-white-block"></div>
      </main>
      <aside>
        <div className="lined-block"></div>
      </aside>
    </div>
  );
}
