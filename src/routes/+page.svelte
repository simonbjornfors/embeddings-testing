<script lang="ts">
    import {models} from "$lib/stores/models.ts"
    import type {Model} from "$lib/types.ts"
    let loading = false;
    let text: string = ""
    let activeModel: Model | null | undefined
    let progress: number = 0;
    let numberOfTests: number = 1;

    async function speedTest() {
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
            for(let i = 0; i < numberOfTests; i++) {
                const Embedding1 = await fetch(`/api/get-embedding`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({text: text === "" ? "Ej specificerad protozosjukdom i tarmen" : text, model: model.modelName, useQuantized: model.useQuantized ?? false, modelType: model.modelType, dimensions: model.dimensions ?? undefined})
                })
                const embedding1Data = await Embedding1.json()
                totalTime += embedding1Data.time;
            }
            model.time = Math.round(totalTime);
            model.averageTime = Math.round(totalTime / numberOfTests);
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
<div class="flex flex-col items-center gap-3 h-full">
    <h1 class="text-xl font-bold">Speed Test</h1>
    <p>Test how long different models take to create an embedding</p>
    <div class="flex flex-row gap-3 justify-center items-center text-center">
        <div class="form-control w-full max-w-xs {loading ? "opacity-50" : ""}">
            <label for="embedding-text" class="label"><span class="label-text text-xs absolute">Embedding Text</span></label>
            <input id="embedding-text" type="text" class="input input-bordered input-sm" bind:value={text} placeholder="Ej specificerad protozosjukdom i tarmen" disabled={loading}>
        </div>
        <div class="form-control w-full max-w-xs {loading ? "opacity-50" : ""}">
            <label for="number-of-tests" class="label"><span class="label-text text-xs absolute">Number of tests</span></label>
            <input id="number-of-tests" type="number" class="input input-bordered input-sm" bind:value={numberOfTests} placeholder="Number of tests" disabled={loading}>
        </div>
        <div class="radial-progress text-primary absolute {!loading ? "hidden" : ""}" style="--value:{progress};">{progress}%</div>
    </div>
    <button class="btn btn-primary btn-sm" on:click={speedTest} disabled={loading}>Speed Test</button>

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
                </tr>
                {/each}
            </tbody>
        </table>
    </div>

</div>

