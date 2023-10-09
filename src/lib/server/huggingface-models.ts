import { HfInference } from "@huggingface/inference";
import { HF_TOKEN } from "$env/static/private";
import { cosineSimilarity } from "$lib/utils";
import { is1DArray } from "$lib/utils";

const hf = new HfInference(HF_TOKEN);

export async function compareTexts(
  text1: string,
  text2: string,
  model: string
): Promise<number> {
  const output1: number[] = await getEmbedding(text1, model);
  console.log("output1: ", output1);
  const output2: number[] = await getEmbedding(text2, model);
  console.log("output2: ", output2);
  let similarity = 0;
  if (is1DArray(output1) && is1DArray(output2)) {
    similarity = cosineSimilarity(output1, output2);
  }
  return similarity;
}

export async function getEmbedding(
  text: string,
  model: string
): Promise<number[]> {
  const embeddingResponse = await hf.featureExtraction({
    model: model,
    inputs: text,
  });
  if (is1DArray(embeddingResponse)) return embeddingResponse;
  return [];
}
export async function computeSimilarityWithEmbedding(
  embedding: number[],
  text: string,
  model: string
): Promise<number> {
  const textEmbedding = await getEmbedding(text, model);
  return cosineSimilarity(embedding, textEmbedding);
}
