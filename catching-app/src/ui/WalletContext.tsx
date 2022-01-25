import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useCallback,
} from "react";
import { Wallet } from "../types";
import { connectWeb3Modal } from "../wallet";

interface WalletContextValue {
  wallet: Wallet;
  connectWallet: () => void;
}

const WalletContext = createContext<WalletContextValue>({
  wallet: {
    address: "",
    provider: null,
    network: null,
  },
  connectWallet: () => {},
});

type Props = {
  children?: React.ReactNode;
};
export function WalletContextProvider({ children }: Props) {
  const [walletContext, setWalletContext] = useState({
    address: "",
    provider: null,
    network: null,
  });

  const connectWallet = useCallback(async () => {
    const provider = await connectWeb3Modal();

    if (provider) {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();

      setWalletContext({
        address,
        provider,
        network,
      });
    }
  }, []);

  console.log("[WalletContextProvider]: walletContext:", walletContext);

  const value = useMemo(
    () => ({
      wallet: walletContext,
      connectWallet,
    }),
    [walletContext, connectWallet]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWalletContext() {
  return useContext(WalletContext);
}
