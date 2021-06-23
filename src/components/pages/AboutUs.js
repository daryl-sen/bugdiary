import SingleColumnLayout from "../layouts/SingleColumnLayout";
import WhiteBgContainer from "../blocks/WhiteBgContainer";

export default function AboutUs() {
  return (
    <SingleColumnLayout preset="narrow-centered">
      <WhiteBgContainer>
        <div>
          <h1>About BugDiary.com</h1>
          <p>
            Thanks for checking us out! We'll have some really useful
            information here soon. In the meantime, please note that BugDiary is
            current in the <b>testing phase</b>.
          </p>
          <p>
            While most of the core features are ready, we're still working to
            improve stability, performance, and error-handling. Account
            management features are currently unavailable.
          </p>

          <h2>Using Development Software</h2>
          <p>
            Any data you created on BugDiary may be deleted during or at the end
            of this testing phase. We'll try our best to preserve any diaries
            and issues you created during this time, but this is not guaranteed!
          </p>
          <h2>A Word of Thanks</h2>
          <p>
            Thanks once again for visiting bugdiary.com. We sincerely hope
            you'll give BugDiary a try when it's fully ready for deployment.
          </p>
          <p
            style={{
              marginTop: "3rem",
            }}
          >
            Daryl Tang
            <br />
            Creator and Software Engineer
            <br />
            BugDiary.com
          </p>
        </div>
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
