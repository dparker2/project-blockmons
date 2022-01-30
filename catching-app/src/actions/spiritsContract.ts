import { BigNumber, Contract, providers } from "ethers";
import addresses from "../contracts/contract-address.json";
import Spirits from "../contracts/Spirits.json";

export async function claimLoot(provider: providers.Web3Provider) {
  const signer = provider.getSigner();
  const contract = new Contract(addresses.Spirits, Spirits.abi, signer);
  const tx = await contract.unsecureMintForTesting();
  await tx.wait();
}

export async function getSpiritsBalance(
  provider: providers.Web3Provider
): Promise<BigNumber> {
  const signer = provider.getSigner();
  const contract = new Contract(addresses.Spirits, Spirits.abi, signer);
  return await contract.balanceOf(await signer.getAddress());
}
