import { OPENAI_API_KEY } from '$env/static/private';
import { dotProduct } from '$lib/utils';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});


export async function compareTexts(text1: string, text2:string ): Promise<number> {
    const embeddingResponse1 = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text1
    });
    const output1 = embeddingResponse1.data[0].embedding;
    console.log(output1)
    const embeddingResponse2 = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text2
    });
    const output2 = embeddingResponse2.data[0].embedding;
    console.log(output2)
let similarity = 0;

similarity = dotProduct(output1, output2);

return similarity;
}
export async function getEmbedding(text:string): Promise<number[]> {
    const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text
    });
    const output = embeddingResponse.data[0].embedding;
    return output;
}



