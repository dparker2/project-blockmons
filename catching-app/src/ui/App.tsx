import React from "react";
import CallToAction from "./CallToAction";
import ConnectWallet from "./ConnectWallet";
import { StateProvider } from "./StateContext";
import { WalletContextProvider } from "./WalletContext";

export default function App() {
  return (
    <WalletContextProvider>
      <StateProvider>
        <div id="top-ui">
          <ConnectWallet />
        </div>
        <div id="bottom-ui">
          <CallToAction />
        </div>
      </StateProvider>
    </WalletContextProvider>
  );
}
