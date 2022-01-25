import React from "react";
import { useWalletContext } from "./WalletContext";

export default function ConnectWallet() {
  const { wallet, connectWallet } = useWalletContext();
  const { provider, network, address } = wallet || {};

  if (!provider) {
    return <button onClick={connectWallet}>Connect Wallet</button>;
  }

  console.log(provider);
  return (
    <div>
      Connected to {network.name} ({address})
    </div>
  );
}
