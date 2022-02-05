import { BigNumber, BigNumberish, Contract, providers } from "ethers";
import addresses from "../contracts/contract-address.json";
import Monsters from "../contracts/Monsters.json";

export async function mintEmpty(
  provider: providers.Web3Provider,
  species: string
) {
  const signer = provider.getSigner();
  const contract = new Contract(addresses.Monsters, Monsters.abi, signer);
  const tx = await contract.unsecureMintForTesting(species);
  await tx.wait();
}

export async function tame(
  provider: providers.Web3Provider,
  tokenId: BigNumber
) {
  const signer = provider.getSigner();
  const contract = new Contract(addresses.Monsters, Monsters.abi, signer);
  const tx = await contract.unsecureTameForTesting(tokenId);
  await tx.wait();
}

export async function getMonsters(
  provider: providers.Web3Provider
): Promise<object[]> {
  const monsters: object[] = [];
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const contract = new Contract(addresses.Monsters, Monsters.abi, signer);

  const balance = await contract.balanceOf(address);
  for (let i = 0; i < balance; i++) {
    const id: BigNumber = await contract.tokenOfOwnerByIndex(address, i);
    const uri = await contract.tokenURI(id);
    monsters.push(await (await fetch(uri)).json());
  }

  return monsters;
}
