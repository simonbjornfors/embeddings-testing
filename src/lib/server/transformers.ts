import {pipeline} from "@xenova/transformers"
import { cosineSimilarity } from '$lib/utils';

export async function generateEmbeddings(text: string = "Hello World!", model: string = "Xenova/all-MiniLM-L6-v2", useQuantized: boolean = false) {

const embeddingsModel = await pipeline("feature-extraction", model, {
    quantized: useQuantized,
})

let result = await embeddingsModel(text, {pooling: "mean", normalize: true});

console.log(result)
}

export async function compareTexts(text1: string, text2:string, model:string, useQuantized: boolean = false ): Promise<number> {
    const embeddingsModel = await pipeline("feature-extraction", model, {
        quantized: useQuantized,
    })
    const output1 = await await embeddingsModel(text1, {pooling: "mean", normalize: true});
    const output2 = await embeddingsModel(text2, {pooling: "mean", normalize: true});
    console.log("output: \n", output1)
    const embedding1 = output1[0].Tensor.data;
    console.log("embedding: \n",embedding1)
    const embedding2 = output2[0].Tensor.data;
    let similarity = 0;
        
    similarity = cosineSimilarity(embedding1, embedding2);

    return similarity;
    }
    