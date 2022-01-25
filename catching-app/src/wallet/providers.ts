import WalletConnectProvider from "@walletconnect/web3-provider";

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        4: "https://rinkeby-light.eth.linkpool.io/",
        31337: "http://localhost:8545",
        80001: "https://rpc-mumbai.matic.today",
      },
    },
  },
};
