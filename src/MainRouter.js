import "./MainRouter.scss";
import TopBar from "./components/layout/TopBar";
import SideNav from "./components/layout/SideNav";

export default function MainRouter(props) {
  return (
    <>
      <TopBar />
      <SideNav />
      <main>
        <h1>Hello</h1>
      </main>
    </>
  );
}
