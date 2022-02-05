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

  const SpiritsToken = await ethers.getContractFactory("Spirits");
  const spiritsToken = await SpiritsToken.deploy(INITIAL_SUPPLY);
  await spiritsToken.deployed();
  const MonstersToken = await ethers.getContractFactory("Monsters");
  const monstersToken = await MonstersToken.deploy();
  await spiritsToken.deployed();

  console.log("Spirits Token address:", spiritsToken.address);
  console.log("Monsters Token address:", monstersToken.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles({ spiritsToken, monstersToken });
}

function saveFrontendFiles({
  spiritsToken,
  monstersToken,
}: {
  spiritsToken: Contract;
  monstersToken: Contract;
}) {
  const contractsDir = __dirname + "/../catching-app/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify(
      { Spirits: spiritsToken.address, Monsters: monstersToken.address },
      undefined,
      2
    )
  );

  const SpiritsArtifact = artifacts.readArtifactSync("Spirits");
  const MonstersArtifact = artifacts.readArtifactSync("Monsters");

  fs.writeFileSync(
    contractsDir + "/Spirits.json",
    JSON.stringify(SpiritsArtifact, null, 2)
  );

  fs.writeFileSync(
    contractsDir + "/Monsters.json",
    JSON.stringify(MonstersArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
