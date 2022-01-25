import AFrame from "aframe";
import { fetchSpawnDetails } from "../api";

export default async function () {
  const details = await fetchSpawnDetails();
  AFrame.scenes[0].emit("setEnemy", details);
}
