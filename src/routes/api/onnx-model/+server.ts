import { compareTexts } from "$lib/server/transformers";

export async function POST({ request }) {
  console.log("onnx-model endpoint called");
  const body = JSON.parse(await request.text());
  console.log("body: ", body);
  const text1 = body.text1;
  const text2 = body.text2;
  const model = body.model;
  const useQuantized = body.useQuantized;
  const similarity = await compareTexts(text1, text2, model, useQuantized);
  return new Response(JSON.stringify({ similarity }), {
    headers: { "content-type": "application/json" },
  });
}
