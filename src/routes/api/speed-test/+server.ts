import { getEmbedding as getEmbeddingOpenaiAda2 }  from "$lib/server/openai-ada-2";
import { getEmbedding as getEmbeddingHuggingface }  from "$lib/server/huggingface-models";
import { generateEmbeddings} from "$lib/server/transformers";

export async function POST({ request }): Promise<Response> {
    const body = JSON.parse(await request.text());
    const text = body.text;
    const models = body.models;
    console.log(text);
    console.log(models);
    for(let model of models){
        console.log(model)
        if(model.includeModel){
            console.log(model.modelName);
            if(model.modelType === "onnx-model")
            {
                const start = performance.now();
                const embedding = await generateEmbeddings(text, model.modelName);
                const end = performance.now();
                console.log(`${model.modelName} took ${end - start} milliseconds.`);
                model.time = end - start;
                model.embedding = embedding;
            }
            else{
            const start = performance.now();
           const embedding = model.modelName === "text-embedding-ada-002" ? await getEmbeddingOpenaiAda2(text) : await getEmbeddingHuggingface(text, model.modelName);
           const end = performance.now();
           console.log(`${model.modelName} took ${end - start} milliseconds.`);
           model.time = end - start;
           model.embedding = embedding;}
        }
    }
    return new Response(JSON.stringify(models), {
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type"
        }
    });
    }
