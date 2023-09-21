import { produce } from "immer";
import { useCallback, useEffect, useState } from "react";

type KeyStates = {
  forward: boolean;
  left: boolean;
  back: boolean;
  right: boolean;
};

const useFirstPersonControls = () => {
  const [keyStates, setKeyStates] = useState<KeyStates>({
    forward: false,
    left: false,
    back: false,
    right: false,
  });

  // useEffect(() => {
  //   console.log({ keyStates })
  // }, [keyStates])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      let key = e.key;
      setKeyStates(
        produce((draft) => {
          if (key === "w") draft.forward = true;
          if (key === "s") draft.back = true;
          if (key === "a") {
            console.log(draft.forward);
            draft.left = true;
          }
          if (key === "d") draft.right = true;
        })
      );
    },
    [keyStates]
  );

  const handleKeyUp = (e: KeyboardEvent) => {
    let key = e.key;
    setKeyStates(
      produce((draft) => {
        if (key === "w") draft.forward = false;
        if (key === "s") draft.back = false;
        if (key === "a") draft.left = false;
        if (key === "d") draft.right = false;
      })
    );
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keyStates;
};

export default useFirstPersonControls;
