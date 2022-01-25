import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

export default {
  solidity: "0.8.10",
  networks: {
    hardhat: {
      accounts: [
        {
          balance: "10000000000000000000000",
          privateKey:
            "0x8e1ea30e3b959b2ff4ba6f3d4e11e67bc030cb0ab05b64b8a5f787353b6bd4d2",
        },
      ],
    },
  },
};
