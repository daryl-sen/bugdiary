import { useParams } from "react-router";

export default function Diary(props) {
  const { uuid } = useParams();
  return (
    <main>
      <h1>Diary Name</h1>
      Diary uuid: {uuid}
    </main>
  );
}
