import React, { useEffect, useState } from "react";
import { useAframeState } from "./StateContext";
import { useWalletContext } from "./WalletContext";
import { getMonsters, getSpiritsBalance } from "../actions";
import { playScene, pauseScene } from "../helpers";

interface MonsterAttributes {
  species: string;
  tamed: boolean;
}

interface Monster {
  name: string;
  description: string;
  attributes: MonsterAttributes;
}

export default function () {
  const { wallet } = useWalletContext();
  const [spirits, setSpirits] = useState(null);
  const [monsters, setMonsters] = useState<object[]>(null);
  const [opened, setOpened] = useState(false);

  const updateBalances = async () => {
    setSpirits(await getSpiritsBalance(wallet.provider));
    setMonsters(await getMonsters(wallet.provider));
  };

  useEffect(() => {
    if (opened) updateBalances();
  }, [opened]);

  console.log(spirits, monsters);

  if (opened) {
    pauseScene();
    return (
      <div className="fullpage-overlay">
        <div>
          <button onClick={() => setOpened(false)}>Close</button>
          <br />
          <div>Spirits: {spirits?.toString()}</div>
          <div>
            Monsters:{" "}
            <ul>
              {monsters?.map(({ attributes }: Monster, index) => (
                <li key={index}>
                  {attributes.tamed || "Empty "}
                  {attributes.species}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  playScene();
  return <button onClick={() => setOpened(true)}>Open Inventory</button>;
}
