import type { Network } from "@ethersproject/networks";
import type { Web3Provider } from "@ethersproject/providers";
import React, { useCallback, useEffect, useState } from "react";
import { connectWeb3Modal } from "../wallet";

export default function ConnectWallet() {
  const [provider, setProvider] = useState<Web3Provider>(null);
  const [address, setAddress] = useState<string>("");
  const [network, setNetwork] = useState<Network>(null);

  const connect = useCallback(async () => {
    const provider = await connectWeb3Modal();

    if (provider) {
      const signer = provider.getSigner();

      setAddress(await signer.getAddress());
      setNetwork(await provider.getNetwork());
      setProvider(provider);
    }
  }, []);

  if (!provider) {
    return <button onClick={connect}>Connect Wallet</button>;
  }

  console.log(provider);
  return (
    <div>
      Connected to {network.name} ({address})
    </div>
  );
}
