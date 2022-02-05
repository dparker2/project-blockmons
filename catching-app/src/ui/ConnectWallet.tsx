import React, { useEffect, useState } from "react";
import { useWalletContext } from "./WalletContext";
import { playScene, pauseScene } from "../helpers";
import { getSpiritsBalance } from "../actions";

export default function ConnectWallet() {
  const { wallet, connectWallet } = useWalletContext();
  const { provider, network, address } = wallet || {};

  if (!provider) {
    //pauseScene();
    return (
      <div className="fullpage-overlay">
        <div>
          <div>
            Connecting a wallet allows you to decrypt their temporal data
            through your camera!
          </div>
          <br />
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      </div>
    );
  }

  //playScene();

  return null;
}
