import WalletConnectProvider from "@walletconnect/web3-provider";

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        4: "https://rinkeby-light.eth.linkpool.io/",
        80001: "https://rpc-mumbai.matic.today",
      },
    },
  },
};
