import { compareTexts } from "$lib/server/openai-ada-2";

export async function POST({ request }) {
  const body = JSON.parse(await request.text());
  const text1 = body.text1;
  const text2 = body.text2;
  const similarity = await compareTexts(text1, text2);
  return new Response(JSON.stringify({ similarity }), {
    headers: { "content-type": "application/json" },
  });
}
