import { getEmbedding as getEmbeddingOpenaiAda2 }  from "$lib/server/openai-ada-2";
import { getEmbedding as getEmbeddingE5SmallV2 }  from "$lib/server/e5-small-v2";

export async function POST({ request }) {
    const body = JSON.parse(await request.text());
    const text = body.text;
    const adaStart = performance.now();
    const embeddingOpenaiAda2 = await getEmbeddingOpenaiAda2(text);
    const adaEnd = performance.now();
    const e5Start = performance.now();
    const embeddingE5SmallV2 = await getEmbeddingE5SmallV2(text);
    const e5End = performance.now();
    console.log(`Ada took ${adaEnd - adaStart} ms`);
    console.log(`E5 took ${e5End - e5Start} ms`);
    const adaTime = adaEnd - adaStart;
    const e5Time = e5End - e5Start;
    const res = {
        ada: {
            time: adaTime,
            embedding: embeddingOpenaiAda2
        },
        e5: {
            time: e5Time,
            embedding: embeddingE5SmallV2
        }
    }
    return new Response(JSON.stringify(res), {
        headers: { "content-type": "application/json" },
    });
    }