import { randomBetween } from "../helpers";

export default async function (enemyHp: number) {
  // Fake 600ms api call
  await new Promise((r) => setTimeout(r, 600));

  // Fake shitty combat logic, 40% 20hp, 30% 30hp, 20% 40hp, 10% miss
  const roll = randomBetween(1, 100);

  if (roll <= 40) {
    return {
      hit: true,
      hp: enemyHp - 20,
    };
  } else if (roll <= 70) {
    return {
      hit: true,
      hp: enemyHp - 30,
    };
  } else if (roll <= 90) {
    return {
      hit: true,
      hp: enemyHp - 40,
    };
  } else {
    return {
      hit: false,
      hp: enemyHp,
    };
  }
}
