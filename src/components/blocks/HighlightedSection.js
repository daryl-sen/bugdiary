import "./HighlightedSection.scss";

export default function HighlightedSection(props) {
  return (
    <section className="highlighted">
      <div
        className="section-text"
        style={{
          marginRight: props.textPosition === "left" && "2rem",
          marginLeft: props.textPosition === "right" && "2rem",
          order: props.textPosition === "left" ? 1 : 2,
        }}
      >
        {props.children}
      </div>
      <div
        className="section-image"
        style={{
          backgroundImage: `url(${props.imgURL})`,
          order: props.textPosition === "left" ? 2 : 1,
        }}
      ></div>
    </section>
  );
}
