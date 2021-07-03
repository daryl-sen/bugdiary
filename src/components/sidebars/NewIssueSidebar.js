import LinedContainer from "../blocks/LinedContainer";
import { Link } from "react-router-dom";

export default function NewIssueSidebar() {
  return (
    <>
      <LinedContainer>
        <h2>Help Message</h2>
        <p>Custom help message here.</p>
      </LinedContainer>
      <LinedContainer>
        <h2>Create Your BugDiary</h2>
        <p>
          BugDiary.com is an online issue-reporting and collaborating platform
          that's completely free to use! You can get set up in as little as 30
          seconds, no signups required!
        </p>
        <Link>
          <button className="custom button-primary">Get Started</button>
        </Link>
      </LinedContainer>
    </>
  );
}
