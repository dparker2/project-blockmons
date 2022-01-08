export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface RandomStepArguments {
  current: THREE.Vector3;
  min: Vector3;
  max: Vector3;
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomStep(args: RandomStepArguments): Vector3 {
  const { current, min, max } = args;
  const dx = randomBetween(min.x, max.x);
  const dy = randomBetween(min.y, max.y);
  const dz = randomBetween(min.z, max.z);

  return {
    x: current.x + dx,
    y: current.y + dy,
    z: current.z + dz,
  };
}
