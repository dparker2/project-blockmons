export default function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
