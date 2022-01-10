import { randomBetween } from "../helpers";

export default async function () {
  // Fake 600ms api call
  await new Promise((r) => setTimeout(r, 600));

  // Fake spawn rate
  // 1: 60%, 2: 30%, 3: 10%
  const roll = randomBetween(1, 100);

  if (roll <= 60) {
    return {
      species: "Uno",
      dexId: 1,
      hp: 100,
    };
  } else if (roll <= 90) {
    return {
      species: "Dos",
      dexId: 2,
      hp: 150,
    };
  } else {
    return {
      species: "Tres",
      dexId: 3,
      hp: 180,
    };
  }
}
