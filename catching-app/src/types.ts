import type { Network } from "@ethersproject/networks";
import type { Web3Provider } from "@ethersproject/providers";

export interface DirtyableArray<T> extends Array<T> {
  __dirty?: boolean;
}

export type BaseMob = { id: string };

export interface ApplicationState {
  maxSpawnable: number;
  inCombat: string;
  spawned?: DirtyableArray<BaseMob>;
  enemy?: {
    species: string;
    dexId: string;
    hp: number;
  };
  enemyImage?: string;
}

export interface Wallet {
  address: string;
  provider: Web3Provider;
  network: Network;
}
