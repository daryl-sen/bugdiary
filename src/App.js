import "./App.scss";
import TopBar from "./components/layout/TopBar";

function App() {
  return (
    <div className="App" style={{ height: "2000px" }}>
      <TopBar />
      <main>
        <h1>My Project</h1>
      </main>
    </div>
  );
}

export default App;
