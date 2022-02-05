import React from "react";
import CallToAction from "./CallToAction";
import ConnectWallet from "./ConnectWallet";
import { StateProvider } from "./StateContext";
import { WalletContextProvider } from "./WalletContext";
import Inventory from "./Inventory";

export default function App() {
  return (
    <WalletContextProvider>
      <StateProvider>
        <div id="top-ui">
          <ConnectWallet />
          <Inventory />
        </div>
        <div id="bottom-ui">
          <CallToAction />
        </div>
      </StateProvider>
    </WalletContextProvider>
  );
}
