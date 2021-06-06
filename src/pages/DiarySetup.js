import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import WhiteBgContainer from "../components/elements/WhiteBgContainer";

export default function DiarySetup() {
  return (
    <SingleColumnLayout
      styleOverride={{
        maxWidth: "500px",
        margin: "auto",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <WhiteBgContainer>
        <h1>Diary Setup</h1>
        <p>
          Your diary is created! Let's add some basic labels to help you
          organize your project's issues.
        </p>
        <hr />
        <h2>Version</h2>
        <p>
          Your project's current version. Issues can be sorted by version
          numbers.
        </p>
        <input type="text" />
        <button className="custom">Create Version</button>
        <button className="custom button-primary">Next Step</button>
        {/* <h2>Versions</h2>
        <p>What's your project's current version?</p>
        <input type="text" />
        <button className="custom">Create Location</button>
        <hr />
        <h2>Locations</h2>
        <p>Where can users expect to see issues?</p>
        <input type="text" />
        <button className="custom">Create Type</button>
        <input type="checkbox" />
        Let users create new locations.
        <hr />
        <h2>Types</h2>
        <p>What types of issues can your users expect to see?</p>
        <input type="text" />
        <button className="custom">Create Location</button>
        <input type="checkbox" />
        Let users create new types. */}
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
