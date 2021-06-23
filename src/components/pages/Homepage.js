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
            and running in <Link to="/new">as little as 30 seconds</Link>
            <sup>1</sup>! What's there to lose?
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
        <h2>General-Purpose, No Learning Curve</h2>
        <p>
          Bug Diary is a non-technical issue-tracker, meaning that anybody can
          pick it up and start using it right away!
        </p>
        <p>
          We follow the KISS principle of software design -{" "}
          <b>keep it stupid simple</b>. Thanks to this, Bug Diary can be used
          for projects of various types.
        </p>
        <p>
          <Link>Is BugDiary Right For My Project?</Link>
        </p>
      </HighlightedSection>

      <HighlightedSection
        imgURL="https://res.cloudinary.com/sensworks/image/upload/v1624484767/bugdiary/debuglaptop_d4kgwn.jpg"
        textPosition="right"
      >
        <h2>Built For You And Your Team</h2>
        <p>
          It's extremely easy to collaborate using Bug Diary. Neither you nor
          your teammates need to sign up for an account.
        </p>
        <p>
          Just create a bug diary, send its unique URL to your team, and start
          tracking issues. It's that easy!
        </p>
        <p>
          <Link to="/new">
            <button className="custom button-primary">Get Started</button>
          </Link>
        </p>
      </HighlightedSection>
    </>
  );
}
