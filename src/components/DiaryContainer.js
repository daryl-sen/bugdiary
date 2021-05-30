import "./DiaryContainer.scss";

export default function DiaryContainer(props) {
  return (
    <div
      style={
        props.styleOverride || {
          backgroundImage: "linear-gradient(to bottom right, #ff8059, #a11313)",
          backgroundColor: "white",
        }
      }
      className="diary-container"
    >
      <main>
        <h3>{props.name}</h3>
        {props.description}
      </main>
    </div>
  );
}
