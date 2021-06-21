import SingleColumnLayout from "../layouts/SingleColumnLayout";
import WhiteBgContainer from "../blocks/WhiteBgContainer";
import { Link } from "react-router-dom";

export default function NoDiaryFound(props) {
  return (
    <SingleColumnLayout preset="narrow-centered">
      <WhiteBgContainer>
        <h1>No Diary Found</h1>
        <p>
          Oops, we couldn't find a diary with that UUID! It might have expired
          due to inactivity. Diaries expire after 3 months of inactivity.
        </p>
        <Link to="/new">
          <button className="custom button-primary">Create a Diary</button>
        </Link>
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
