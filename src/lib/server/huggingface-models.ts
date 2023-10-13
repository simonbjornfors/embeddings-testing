import { HfInference } from "@huggingface/inference";
import { HF_TOKEN } from "$env/static/private";
import { cosineSimilarity, is1DArray, meanPooling } from "$lib/utils";

const hf = new HfInference(HF_TOKEN);

export async function compareTexts(
  text1: string,
  text2: string,
  model: string
): Promise<number> {
  let output1: number[] = await hf.featureExtraction({
    inputs: text1,
    model: model,
  });
  const [result] = output1;
  console.log("output1: ", output1.length);
  if (Array.isArray(result)) {
    console.log("result: ", result.length);
  }
  if (!is1DArray(output1)) {
    console.log("output1 is not 1D array");
    output1 = meanPooling(result);
  }

  let output2: number[] = await getEmbedding(text2, model);
  console.log("output2: ", output2.length);
  const [result2] = output2;
  if (Array.isArray(result2)) {
    console.log("result2: ", result2.length);
  }
  output2 = !is1DArray(output2) ? meanPooling(result2) : output2;

  let similarity = cosineSimilarity(output1, output2);

  return similarity;
}

export async function getEmbedding(
  text: string,
  model: string
): Promise<number[] | number[][]> {
  const embeddingResponse = await hf.featureExtraction({
    model: model,
    inputs: text,
  });
  return embeddingResponse;
}
export async function computeSimilarityWithEmbedding(
  embedding: number[],
  text: string,
  model: string
): Promise<number> {
  const textEmbedding = await getEmbedding(text, model);
  return cosineSimilarity(embedding, textEmbedding);
}
