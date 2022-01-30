import React from "react";
import { useAframeState } from "./StateContext";
import CombatOptions from "./CombatOptions";

export default function CallToAction() {
  const state = useAframeState();
  let content: React.ReactNode = "";

  if (!state.inCombat) {
    content = "There they are! Focus on one to fight it!";
  } else if (state.enemy?.species) {
    content = (
      <div>
        That's a {state.enemy.species}! What do you want to do?{" "}
        <CombatOptions />
      </div>
    );
  }

  if (!content) return null;

  return <div className="textbox">{content}</div>;
}
