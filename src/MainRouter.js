import { useState } from "react";

import "./MainRouter.scss";

import { useAppContext } from "./AppContext";

export default function MainRouter(props) {
  const [menuState, setMenuToggle] = useState(false);

  const { context, setContext } = useAppContext();
  console.log(context);

  return (
    <>
      <button
        onClick={() => {
          setContext((prev) => {
            return { ...prev, name: "hello" };
          });
        }}
      >
        Click
      </button>
    </>
  );
}
