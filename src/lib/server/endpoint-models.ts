import { HF_TOKEN } from "$env/static/private";

export async function getEmbedding(text: string, model: string): Promise<any> {
  console.log("stickerapp model getEmbedding: ", text, model);

  const response = await fetch(model, {
    headers: {
      Authorization: "Bearer " + HF_TOKEN,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs: text }),
  });
  const result = await response.json();
  console.log("stickerapp model getEmbedding response: ", result);
  return result;
}
