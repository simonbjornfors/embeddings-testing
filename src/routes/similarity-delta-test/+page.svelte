<script lang="ts">
    import {models} from "$lib/stores/models"
    import {cosineSimilarity} from "$lib/utils"
    import type {Model} from "$lib/types.ts"
    import {prompts} from "$lib/stores/prompts"
    import {icd10s} from "$lib/stores/icd10s"

    let loading: boolean = false;
    let activeModel: Model | null | undefined
    let progress: number = 0;
    async function similarityDeltaTest() {
        try{
            if($models.filter(model => model.includeModel).length === 0) {
            alert("Please select at least one model")
            return
        } 
        loading = true
        for(let model of $models) {
            progress = Math.round(($models.indexOf(model) / $models.length) * 100)
            console.log(model)
            activeModel = model
            $models = [...$models];
            if(!model.includeModel) continue;
            model.time = 0
            for(let prompt of $prompts) {
                const Embedding = await fetch(`/api/get-embedding`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({text: prompt.text, model: model.modelName, useQuantized: model.useQuantized ?? false, modelType: model.modelType, dimensions: model.dimensions ?? undefined})
                })
                const embeddingData = await Embedding.json()
                prompt.embedding = embeddingData.embedding
                model.time += embeddingData.time
            }
            for(let icd10 of $icd10s) {
                const Embedding = await fetch(`/api/get-embedding`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({text: icd10.text, model: model.modelName, useQuantized: model.useQuantized ?? false, modelType: model.modelType, dimensions: model.dimensions ?? undefined})
                })
                const embeddingData = await Embedding.json()
                icd10.embedding = embeddingData.embedding
                model.time += embeddingData.time
            }
            let comparisonCount = 0
            let totalSimilarity = 0
            let totalMatchSimilarity = 0
            let totalNonMatchSimilarity = 0;
            let nonMatchCount = 0;
            let totalDelta = 0
            for (let prompt of $prompts) {
                let promptMatchSimilarity = 0
                if($icd10s.find(icd10 => icd10.text === prompt.expected)?.embedding as number[]){
                    promptMatchSimilarity = cosineSimilarity(prompt.embedding as number[], $icd10s.find(icd10 => icd10.text === prompt.expected)?.embedding as number[])
                    totalMatchSimilarity += promptMatchSimilarity
                }else{
                    console.log("No match found for " + prompt.expected)
                }
                for (let icd10 of $icd10s) {
                    const similarity = cosineSimilarity(prompt.embedding as number[], icd10.embedding as number[])
                    if(icd10.text !== prompt.expected) {
                        totalNonMatchSimilarity += similarity;
                        nonMatchCount++;
                        if(promptMatchSimilarity !== 0) {
                            totalDelta += promptMatchSimilarity - similarity;
                        }
                    }
                    totalSimilarity += similarity;
                    comparisonCount++;
                }
            }
            let delta = 0
            let averageMatchSimilarity = (totalMatchSimilarity / $prompts.length)
            let averageNonMatchSimilarity = (totalNonMatchSimilarity / (($prompts.length * $icd10s.length)-$prompts.length))
            console.log("match: ", averageMatchSimilarity)
            console.log("non match: ", averageNonMatchSimilarity)
            if( averageMatchSimilarity>averageNonMatchSimilarity ){
                delta = averageMatchSimilarity - averageNonMatchSimilarity;
                console.log(`delta = ${averageMatchSimilarity} - ${averageNonMatchSimilarity} = ${delta}`)
            }else{
                delta = averageNonMatchSimilarity - averageMatchSimilarity;
                delta = 0 - delta;
            }
            model.similarity = Number((totalSimilarity / ($prompts.length * $icd10s.length)).toFixed(3));
            model.nonMatchSimilarity = Number((totalNonMatchSimilarity / (($prompts.length * $icd10s.length)-$prompts.length)).toFixed(3));
            model.matchSimilarity = Number((totalMatchSimilarity / $prompts.length).toFixed(3));
            model.delta = Number(delta.toFixed(3));
            model.averageTime = Math.round(model.time / ($prompts.length + $icd10s.length))
            const index = $models.findIndex(model => model.name === activeModel?.name);
        if (index !== -1) {
            $models[index] = {...model};
        }
        $models = [...$models];
        }
        await delay(50);
        loading = false
    }
        catch(err) {
            loading = false
            console.log(err)
            alert(err)
        }finally {
            loading = false;
            activeModel = null;
            $models = [...$models];
        }
    }
    function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
</script>

<div class="flex flex-col items-center gap-3 h-full w-full">
    <h1 class="text-xl font-bold" class:opacity-50={loading}>Similarity Delta Test</h1>
    <p class:opacity-50={loading}>Compare similarity delta between words that should and shouldn't match accoriding to each model using <a class="link" target="_blank" href="https://en.wikipedia.org/wiki/Cosine_similarity">cosine similarity</a></p>
    <div class="form-control w-full flex-col gap-3 justify-center items-center text-center ">
        <button class="btn btn-primary btn-sm" disabled={loading} on:click={similarityDeltaTest}>Run Test</button>
        <div class="radial-progress text-primary absolute {!loading ? "hidden" : ""}" style="--value:{progress};">{progress}%</div>
    </div>
    <div class="flex flex-row justify-between mx-3 w-full">
        <div class="flex flex-row gap-3 ml-3">
            <button class="btn btn-xs btn-primary" disabled={loading} on:click={() => { $models.forEach(model => model.includeModel = true); $models = [...$models]; }}>All</button>
            <button class="btn btn-xs btn-secondary" disabled={loading} on:click={() => { $models.forEach(model => model.includeModel = false); $models = [...$models]; }}>None</button>
        </div>
    </div>
    <div class="w-full">
        <table class="table">
            <thead>
                <tr>
                  <th class="w-1/12"></th>
                  <th class="w-1/12">Model</th>
                  <th class="w-1/12">Tot. Time</th>
                  <th class="w-1/12">Avg. Time</th>
                  <th class="w-1/12">Avg. Similarity</th>
                  <th class="w-1/12">Avg. Match Similarity</th>
                  <th class="w-1/12">Avg. Non Match Similarity</th>
                  <th class="w-1/12">Avg. Delta</th>
                </tr>
              </thead>
              <tbody>
                {#each $models as model, i}
                <tr class="text-xs {activeModel?.name === model.name ? "bg-accent text-accent-content" : i % 2 === 0 ? "bg-base-200" : ""}">
                  <td class="relative"><input class="checkbox checkbox-xs checkbox-primary" type="checkbox" id={model.name} name="model" bind:checked={model.includeModel} disabled={loading}><span class="loading loading-spinner loading-xs text-secondary {activeModel?.name !== model.name ? "hidden" : ""}" ></span>
                  </td>
                  <td>{model.name}</td>
                  <td>{model.time ? model.time + " ms" : ""}</td>
                  <td>{model.time ? model.averageTime + " ms" : ""}</td>
                  <td>{model.similarity ?? ""}</td>
                  <td>{model.matchSimilarity ?? ""}</td>
                  <td>{model.nonMatchSimilarity ?? ""}</td>
                  <td>{model.delta ?? ""}</td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

