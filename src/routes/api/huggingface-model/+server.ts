import { compareTexts } from "$lib/server/huggingface-models";

export async function POST({ request }) {
  console.log("huggingface-model endpoint called");
  const body = JSON.parse(await request.text());
  console.log("body: ", body);
  const text1 = body.text1;
  const text2 = body.text2;
  const model = body.model;
  const similarity = await compareTexts(text1, text2, model);
  console.log("similarity: ", similarity);
  return new Response(JSON.stringify({ similarity }), {
    headers: { "content-type": "application/json" },
  });
}
