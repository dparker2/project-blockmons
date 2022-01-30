import React from "react";
import { useAframeState } from "./StateContext";
import { useWalletContext } from "./WalletContext";
import { claimLoot } from "../actions";

export default function () {
  const state = useAframeState();
  const { wallet } = useWalletContext();

  const handleKill = () => {
    console.log("Kill!");
    claimLoot(wallet.provider);
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
