import AFrame from "aframe";
import { fetchSpawnDetails } from "./api";

export async function revealSpawn() {
  const details = await fetchSpawnDetails();
  AFrame.scenes[0].emit("setEnemy", details);
}
