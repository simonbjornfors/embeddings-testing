import { computeSimilarityWithEmbedding as huggingfaceSimilarity } from "$lib/server/huggingface-models";
import { computeSimilarityWithEmbedding as onnxSimilarity } from "$lib/server/transformers";
import { computeSimilarityWithEmbedding as adaSimilarity } from "$lib/server/openai-ada-2";

export async function POST({ request }) {
  console.log("synonym-compare endpoint called");
  const body = JSON.parse(await request.text());
  const embedding = body.embedding;
  const text2 = body.text2;
  console.log("text2: ", text2);
  const model = body.model;
  const modelType = body.modelType;
  let similarity: number = 0;
  console.log("modelType: ", modelType);
  if (modelType === "huggingface-model") {
    similarity = await huggingfaceSimilarity(embedding, text2, model);
  } else if (modelType === "onnx-model") {
    const useQuantized = body.useQuantized;
    console.log("embedding length: ", embedding.length);
    similarity = await onnxSimilarity(embedding, text2, model, useQuantized);
  } else if (modelType === "openai-ada-2") {
    similarity = await adaSimilarity(embedding, text2);
  }
  console.log("similarity: ", similarity);
  return new Response(JSON.stringify({ similarity }), {
    headers: { "content-type": "application/json" },
  });
}
