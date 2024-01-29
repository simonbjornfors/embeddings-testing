import { COHERE_API_KEY } from "$env/static/private";
import { CohereClient } from "cohere-ai";
import { cosineSimilarity } from "$lib/utils";

const cohere = new CohereClient({ token: COHERE_API_KEY });

export async function getEmbedding(text: string) {
  const embeddingResponse = await cohere.embed({
    texts: [text],
    model: "embed-multilingual-v3.0",
    inputType: "search_document",
  });
  console.log(
    `resposne embedding shape: ${
      (embeddingResponse.embeddings as number[][]).length
    }, ${(embeddingResponse.embeddings as number[][])[0].length}`
  );
  return embeddingResponse.embeddings;
}

export async function compareTexts(text1: string, text2: string) {
  const embeddingResponse1 = await cohere.embed({
    texts: [text1],
    model: "embed-multilingual-v3.0",
    inputType: "search_document",
  });
  const output1 = embeddingResponse1.embeddings as number[][];
  console.log(output1);
  const embeddingResponse2 = await cohere.embed({
    texts: [text2],
    model: "embed-multilingual-v3.0",
    inputType: "search_document",
  });
  const output2 = embeddingResponse2.embeddings as number[][];
  console.log(output2);
  let similarity = 0;

  similarity = cosineSimilarity(output1, output2);

  return similarity;
}

getEmbedding("test");
