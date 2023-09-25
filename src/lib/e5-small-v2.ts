import { HfInference } from '@huggingface/inference';
import { HF_TOKEN } from '$env/static/private';

const hf = new HfInference(HF_TOKEN);

function dotProduct(a: number[], b: number[]) {
    if(a.length !== b.length) throw new Error("Vectors must be of same length");
    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result += a[i] * b[i];
    }
    return result;
}
function is1DArray<T>(value: (T | T[] | T[][])[]): value is T[] {
    return !Array.isArray(value[0]);
}
export async function compareTexts(text1: string, text2:string ) {
const output1 = await hf.featureExtraction({
    model: "intfloat/e5-small-v2",
    inputs: "Kolera orsakad av Vibrio cholerae 01, biovar el tor",
})
const output2 = await hf.featureExtraction({
    model: "intfloat/e5-small-v2",
    inputs: "Kolera orsakas av Vibrio cholerae 01, biovar el tor",
})
let similarity = 0;
if(is1DArray(output1) && is1DArray(output2)) {
    
similarity = dotProduct(output1, output2);
}
return similarity;
}



