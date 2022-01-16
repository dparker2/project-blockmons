import React from "react";
import { useAframeState } from "./StateContext";

const TEXTS = {
  focusOnOne: "There they are! Focus on one to fight it!",
  inCombat: (species: string) => `That's a ${species}! What to you want to do?`,
};

export default function CallToAction() {
  const state = useAframeState();
  let content = "";
  if (!state.inCombat) {
    content = TEXTS.focusOnOne;
  } else if (state.enemy?.species) {
    content = TEXTS.inCombat(state.enemy.species);
  }

  if (!content) return null;

  return <div className="textbox">{content}</div>;
}
