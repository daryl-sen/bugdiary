import { useParams } from "react-router";
import SingleColumnLayout from "../components/layout/SingleColumnLayout";

export default function Diary(props) {
  const { uuid } = useParams();
  return (
    <SingleColumnLayout>
      <h1>Diary Name</h1>
      Diary uuid: {uuid}
    </SingleColumnLayout>
  );
}
