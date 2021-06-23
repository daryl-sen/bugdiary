import "./Homepage.scss";
import { Link } from "react-router-dom";
import HighlightedSection from "../blocks/HighlightedSection";

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

      <HighlightedSection
        imgURL="https://res.cloudinary.com/sensworks/image/upload/v1624484767/bugdiary/twogirlsdebugging_qpeyrr.jpg"
        textPosition="left"
      >
        <h2>Built for You and Your Team</h2>
        <p>
          Create a Bug Diary is as little as 30 seconds, then share its unique
          URL with your teammates.
        </p>
        <p>
          BugDiary is a non-technical bug tracker, meaning that anyone can pick
          it up and start using it. You can get set up in less than 30 seconds!
        </p>
      </HighlightedSection>

      <HighlightedSection
        imgURL="https://res.cloudinary.com/sensworks/image/upload/v1624484767/bugdiary/debuglaptop_d4kgwn.jpg"
        textPosition="right"
      >
        <h2>Built for You and Your Team</h2>
        <p>
          Reports are generated each time you login, telling you how many issues
          have been reported or solved across all your BugDiaries since your
          last login.
        </p>
        <p>
          Collaborate with other BugDiary users to track multiple projects
          together.
        </p>
      </HighlightedSection>
    </>
  );
}
