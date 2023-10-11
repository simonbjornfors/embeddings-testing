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
