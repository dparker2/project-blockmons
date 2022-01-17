import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { providerOptions } from "./providers";

export async function connectWeb3Modal() {
  const web3Modal = new Web3Modal({
    providerOptions,
  });
  const instance = await web3Modal.connect();

  const provider = new ethers.providers.Web3Provider(instance);
  return provider;
}
