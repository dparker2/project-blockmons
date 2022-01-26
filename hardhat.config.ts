import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";

import config from "./config.json";

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

export default {
  solidity: "0.8.10",
  networks: {
    rinkeby: {
      url: "https://rinkeby-light.eth.linkpool.io/",
      accounts: config.rinkeby.accounts,
    },
  },
};
