export function heavyCalculation(iterations: number): number {
  let result = 0;

  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i) * Math.random();
  }

  return result;
}
