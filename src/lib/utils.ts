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
export function cosineSimilarity(
  a: number[] | number[][],
  b: number[] | number[][]
): number {
  let a_single_dimension: number[] = [];
  let b_single_dimension: number[] = [];
  if (!is1DArray(a) && !is1DArray(b)) {
    a_single_dimension = meanPooling(a);
    b_single_dimension = meanPooling(b);
  } else {
    a_single_dimension = a as number[];
    b_single_dimension = b as number[];
  }
  if (a.length !== b.length)
    throw new Error(
      `Vectors must be of same length a length: ${a.length} b length: ${b.length}`
    );
  return (
    dotProduct(a_single_dimension, b_single_dimension) /
    (magnitude(a_single_dimension) * magnitude(b_single_dimension))
  );
}
export function meanPooling(embeddings: number[][]): number[] {
  if (embeddings.length === 0) return [];

  const numTokens = embeddings.length;
  const numFeatures = embeddings[0].length;

  // Initialize an array to store the sum of each feature across all tokens
  const summed = Array(numFeatures).fill(0);

  for (let i = 0; i < numTokens; i++) {
    for (let j = 0; j < numFeatures; j++) {
      summed[j] += embeddings[i][j];
    }
  }

  // Average out the summed features
  const averaged = summed.map((val) => val / numTokens);

  return averaged;
}
