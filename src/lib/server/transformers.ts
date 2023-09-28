import {pipeline} from "@xenova/transformers"

export async function generateEmbeddings(text: string = "Hello World!", model: string = "Xenova/all-MiniLM-L6-v2") {

const embeddingsModel = await pipeline("feature-extraction", model)

let result = await embeddingsModel(text, {pooling: "mean", normalize: true});

console.log(result)
}