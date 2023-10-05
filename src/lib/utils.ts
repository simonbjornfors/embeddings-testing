export function dotProduct(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error("Vectors must be of same length");
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result += a[i] * b[i];
  }
  return result;
}
export function is1DArray<T>(value: (T | T[] | T[][])[]): value is T[] {
  return !Array.isArray(value[0]);
}
export function magnitude(a: number[]): number {
  return Math.sqrt(dotProduct(a, a));
}
export function cosineSimilarity(a: number[], b: number[]): number {
  console.log("a length: ", a.length);
  console.log("b length: ", b.length);
  if (a.length !== b.length) throw new Error("Vectors must be of same length");
  return dotProduct(a, b) / (magnitude(a) * magnitude(b));
}
