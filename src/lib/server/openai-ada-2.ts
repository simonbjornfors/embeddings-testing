import { OPENAI_API_KEY } from "$env/static/private";
import { cosineSimilarity } from "$lib/utils";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function compareTexts(
  text1: string,
  text2: string,
  model: string
): Promise<number> {
  const embeddingResponse1 = await openai.embeddings.create({
    model: model,
    input: text1,
  });
  const output1 = embeddingResponse1.data[0].embedding;
  console.log(output1);
  const embeddingResponse2 = await openai.embeddings.create({
    model: model,
    input: text2,
  });
  const output2 = embeddingResponse2.data[0].embedding;
  console.log(output2);
  let similarity = 0;

  similarity = cosineSimilarity(output1, output2);

  return similarity;
}
export async function getEmbedding(
  text: string,
  model: string,
  dimensions?: number
): Promise<number[]> {
  let embeddingResponse: any = [];
  if (model === "ada-002") {
    embeddingResponse = await openai.embeddings.create({
      model: model,
      input: text,
    });
  } else {
    embeddingResponse = await openai.embeddings.create({
      model: model,
      input: text,
      dimensions: dimensions,
    });
  }
  const output = embeddingResponse.data[0].embedding;
  return output;
}
export async function computeSimilarityWithEmbedding(
  embedding: number[],
  text: string,
  model: string
): Promise<number> {
  const textEmbedding = await getEmbedding(text, model);
  return cosineSimilarity(embedding, textEmbedding);
}
