import { generateEmbeddings as getOnnxEmbedding } from "$lib/server/transformers";
import { getEmbedding as getOpenaiAda2Embedding } from "$lib/server/openai-ada-2";
import { getEmbedding as getHuggingfaceEmbedding } from "$lib/server/huggingface-models";
import { getEmbedding as getStickerAppEmbedding } from "$lib/server/endpoint-models";
import { getEmbedding as getCohereEmbedding } from "$lib/server/cohere";

export async function POST({ request }): Promise<Response> {
  const body = JSON.parse(await request.text());
  console.log(body);
  const text = body.text;
  const model = body.model;
  const modelType = body.modelType;
  const dimensions = body.dimensions ?? undefined;
  let embedding: number[] | number[][] = [];
  if (modelType === "onnx-model") {
    const start = performance.now();
    embedding = await getOnnxEmbedding(text, model);
    const end = performance.now();
    console.log("get-embedding endpoint embedding length: ", embedding.length);
    console.log(`${model} took ${end - start} milliseconds.`);
    return new Response(
      JSON.stringify({ embedding, time: Math.round(end - start) }),
      {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } else if (modelType === "huggingface-model") {
    const start = performance.now();
    embedding = await getHuggingfaceEmbedding(text, model);
    const end = performance.now();
    console.log(`${model} took ${end - start} milliseconds.`);
    console.log("get-embedding endpoint embedding length: ", embedding.length);
    return new Response(
      JSON.stringify({ embedding, time: Math.round(end - start) }),
      {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } else if (modelType === "openai") {
    const start = performance.now();
    embedding = await getOpenaiAda2Embedding(
      text,
      model,
      dimensions ?? undefined
    );
    console.log("get-embedding endpoint embedding length: ", embedding.length);
    const end = performance.now();
    console.log(`${model} took ${end - start} milliseconds.`);
    return new Response(
      JSON.stringify({ embedding, time: Math.round(end - start) }),
      {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } else if (modelType === "endpoint-model") {
    const start = performance.now();
    const result = await getStickerAppEmbedding(text, model);
    embedding = result.embeddings;
    console.log("get-embedding endpoint embedding length: ", embedding.length);
    const end = performance.now();
    console.log(`${model} took ${end - start} milliseconds.`);
    return new Response(
      JSON.stringify({ embedding, time: Math.round(end - start) }),
      {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } else if (modelType === "cohere") {
    const start = performance.now();
    console.log("getting cohere embedding");
    const result = await getCohereEmbedding(text);
    let embedding_cohere = result;
    const end = performance.now();
    console.log(`${model} took ${end - start} milliseconds.`);
    return new Response(
      JSON.stringify({
        embedding: embedding_cohere,
        time: Math.round(end - start),
      }),
      {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } else {
    return new Response(JSON.stringify({ error: "No model of that type." }), {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
}
