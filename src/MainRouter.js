import { useState, useEffect } from "react";
import "./MainRouter.scss";
import { useAppContext } from "./AppContext";
import useUserFunctions from "./hooks/useUserFunctions";

export default function MainRouter(props) {
  const [menuState, setMenuToggle] = useState(false);
  const { context, setContext } = useAppContext();
  const { checkToken } = useUserFunctions(context);

  useEffect(() => {
    checkToken(setContext);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
