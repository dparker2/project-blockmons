import { ethers } from "hardhat";

async function main() {
  const Spirits = await ethers.getContractFactory("Spirits");
  const spirits = await Spirits.deploy();

  console.log("Contract deployed to address:", spirits.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
