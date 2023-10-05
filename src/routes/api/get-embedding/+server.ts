import { generateEmbeddings as getOnnxEmbedding } from "$lib/server/transformers";
import { getEmbedding as getOpenaiAda2Embedding } from "$lib/server/openai-ada-2";
import { getEmbedding as getHuggingfaceEmbedding } from "$lib/server/huggingface-models";

export async function POST({ request }): Promise<Response> {
  const body = JSON.parse(await request.text());
  console.log(body);
  const text = body.text;
  const model = body.model;
  const modelType = body.modelType;
  let embedding: number[] = [];
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
  } else if (modelType === "openai-ada-2") {
    const start = performance.now();
    embedding = await getOpenaiAda2Embedding(text);
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
