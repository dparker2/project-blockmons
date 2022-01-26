import { Contract } from "ethers";
import fs from "fs";
import { ethers, artifacts } from "hardhat";

const INITIAL_SUPPLY = 1000000000;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Spirits");
  const token = await Token.deploy(INITIAL_SUPPLY);
  await token.deployed();

  console.log("Token address:", token.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(token);
}

function saveFrontendFiles(token: Contract) {
  const contractsDir = __dirname + "/../catching-app/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Spirits: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Spirits");

  fs.writeFileSync(
    contractsDir + "/Spirits.json",
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
