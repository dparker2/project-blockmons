import React from "react";
import { StateProvider } from "./StateContext";
import CallToAction from "./CallToAction";
import ConnectWallet from "./ConnectWallet";

export default function App() {
  return (
    <StateProvider>
      <div id="top-ui">
        <ConnectWallet />
      </div>
      <div id="bottom-ui">
        <CallToAction />
      </div>
    </StateProvider>
  );
}
