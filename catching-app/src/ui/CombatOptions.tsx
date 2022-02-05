import React from "react";
import { useAframeState } from "./StateContext";
import { useWalletContext } from "./WalletContext";
import { claimLoot, mintEmpty, tame } from "../actions";
import { randomBetween } from "../helpers";

export default function () {
  const state = useAframeState();
  const { wallet } = useWalletContext();

  const handleKill = () => {
    console.log("Kill!");
    if (randomBetween(0, 10) < 5) {
      claimLoot(wallet.provider);
    } else {
      mintEmpty(wallet.provider, state.enemy.species);
    }
  };

  return (
    <ul>
      <li className="menu-item">
        <button onClick={handleKill}>Fight (Kill instantly)</button>
      </li>
      <li className="menu-item">
        <button onClick={() => console.log("Tame!")}>
          Tame {state.enemy.species}
        </button>
      </li>
    </ul>
  );
}
