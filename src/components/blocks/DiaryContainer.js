import "./DiaryContainer.scss";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";

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
        <h3>
          <Link to={"/diary/" + props.uuid}>
            <BiLink /> {props.name}
          </Link>
        </h3>
        {props.description}
      </main>
      {/* <aside>
        <BiBug />
        &nbsp; 0 / 5
      </aside> */}
    </div>
  );
}
