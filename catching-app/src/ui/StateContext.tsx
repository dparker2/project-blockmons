import AFRAME, { DetailEvent } from "aframe";
import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import { initialState } from "../state";

const StateContext = createContext(initialState);

type Props = {
  children?: React.ReactNode;
};
export function StateProvider({ children }: Props) {
  const [currentState, setCurrentState] = useState(initialState);
  const aframeScene = useMemo(() => AFRAME.scenes[0], [AFRAME]);

  useEffect(() => {
    const listener = (
      evt: DetailEvent<{
        action: string;
        lastState: typeof initialState;
        payload: any;
        state: typeof initialState;
      }>
    ) => {
      setCurrentState({ ...evt.detail.state });
    };
    aframeScene.addEventListener("stateupdate", listener);
    return () => aframeScene.removeEventListener("stateupdate", listener);
  }, [aframeScene]);

  console.log("[StateContext]: currentState:", currentState);

  return (
    <StateContext.Provider value={currentState}>
      {children}
    </StateContext.Provider>
  );
}

export function useAframeState() {
  const state = useContext(StateContext);
  return state;
}
