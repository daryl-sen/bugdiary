import "./Homepage.scss";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <section id="splash">
        <div id="welcome">
          <h1>Welcome to Bug Diary</h1>
          <p>
            Bug Diary is an online issue-reporting and bug-tracking platform. No
            payments, no sign-ups required, and you can get your Bug Diary up
            and running in <Link to="/new">less than 30 seconds</Link>!
          </p>
          <div style={{ maxWidth: "50%", margin: "auto" }}>
            <Link to="/new">
              <button className="custom button-primary">
                Get Setup In 30 seconds
              </button>
            </Link>
            <Link to="/signup">
              <button className="custom button-primary">
                Sign Up For More Features
              </button>
            </Link>
          </div>
          <p></p>
        </div>
      </section>

      <section>
        <h2>Built for you and your team</h2>
      </section>
    </>
  );
}
