<script lang="ts">
    import {models} from "$lib/stores/models.ts"
    import type {Model} from "$lib/types.ts"
    let loading: boolean = false;
    let activeModel: Model | null | undefined
    let progress: number = 0;
    let text1 = ""
    let text2 = ""

    async function similarityTest() {
        try{
        if($models.filter(model => model.includeModel).length === 0) {
            alert("Please select at least one model")
            return
        } 

        loading = true
        for(let model of $models) {
            let totalTime = 0;
            progress = Math.round(($models.indexOf(model) / $models.length) * 100)
            console.log(model)
            activeModel = model
            $models = [...$models];
            if(!model.includeModel) continue;

        let start = performance.now()
        const res = await fetch(`/api/${activeModel.modelType}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({text1: text1 === "" ? "akillestendinit" : text1, text2: text2 === "" ? "hälseneinflammation" : text2, selectedModel: activeModel.modelName, useQuantized: activeModel.useQuantized ?? false})
        })
        const data = await res.json()
        model.similarity = data.similarity
        totalTime = performance.now() - start
        model.time = Math.round(totalTime);
        model.averageTime = Math.round(totalTime / 2);
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
    <h1 class="text-xl font-bold">Similarity Test</h1>
    <p>Compare similarity accoriding to each model using <a class="link" target="_blank" href="https://en.wikipedia.org/wiki/Cosine_similarity">cosine similarity</a></p>
    <div class="form-control w-full flex-col gap-3 justify-center items-center text-center ">
        <div class="flex flex-row gap-3 w-1/3 justify-center {loading ? "opacity-50" : ""}">
            <div class="flex flex-col w-1/2">
                <label for="text1" class="label"><span class="label-text text-xs absolute">Text 1</span>
                </label>
                <input id="text1" type="text" class="input input-sm rounded relative" disabled={loading} placeholder="akillestendinit" bind:value={text1}>
            </div>
            <div class="flex flex-col w-1/2">
                <label for="text2" class="label"><span class="label-text text-xs absolute">Text 2</span>
                </label>
                <input id="text2" type="text" class="input input-sm rounded relative" bind:value={text2} placeholder="hälseneinflammation" disabled={loading}>
            </div>
        </div>
        <button class="btn btn-primary btn-sm" disabled={loading} on:click={similarityTest}>Run Test</button>
        <div class="radial-progress text-primary absolute {!loading ? "opacity-0" : ""}" style="--value:{progress};">{progress}%</div>
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
                  <th class="w-1/12">Similarity</th>
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
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

