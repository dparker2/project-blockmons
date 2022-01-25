import fs from "fs";
import { ethers } from "hardhat";

const INITIAL_SUPPLY = 1000000000;
const MANIFESTS = ["catching-app/src/contract.manifest.json"];

async function main() {
  const Spirits = await ethers.getContractFactory("Spirits");
  const spirits = await Spirits.deploy(INITIAL_SUPPLY);
  const manifestJSON = JSON.stringify(
    {
      spiritsContract: spirits.address,
    },
    null,
    4
  );

  console.log("Contract deployed to address:", spirits.address);
  console.log("Interface:", spirits.interface);
  MANIFESTS.forEach((path) => {
    fs.writeFileSync(path, manifestJSON);
    console.log(`Updated manifest at ${path}`);
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
