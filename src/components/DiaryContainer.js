import "./DiaryContainer.scss";

export default function DiaryContainer(props) {
  return (
    <div className="diary-container">
      <h3>{props.name}</h3>
    </div>
  );
}
