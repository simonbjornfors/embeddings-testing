<script>
    import {models} from "$lib/stores/models.ts"
    let selectedModel = $models[0];
    let text1 = ""
    let text2 = ""
    let similarity = 0
    let loading = false
    let speed = 0;
    const handleCompare = async () => {
        loading = true;
        let start = performance.now()
        const res = await fetch(`/api/${selectedModel.modelType}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({text1, text2, selectedModel: selectedModel.modelName, useQuantized: selectedModel.useQuantized ?? false})
        })
        const data = await res.json()
        similarity = data.similarity
        loading = false;
        speed = performance.now() - start
    }
</script>
<div class="flex flex-col w-[90%] h-screen items-center gap-3 mx-auto mt-3">
    <h1 class="text-xl font-bold">
        Compare text similarity using 
        <select class="select text-xl font-bold">
            {#each $models as model}
                <option value={model.modelName} on:click={()=>selectedModel=model}>{model.name}</option>
            {/each}
        </select>
    </h1>
    <p>Embeddings are compared using <a class="link" href="https://en.wikipedia.org/wiki/Cosine_similarity">cosine similarity</a></p>
    <div class="flex flex-row gap-3">
        <input type="text" class="input input-bordered" bind:value={text1} placeholder="Text 1">
        <input type="text" class="input input-bordered" bind:value={text2} placeholder="Text 2">
    </div>
    <div class="flex flex-row gap-3">
        <button class="btn btn-primary relative" on:click={handleCompare}>Compare <span class="loading loading-spinner loading-xs absolute right-0 top-0" class:hidden={!loading}></span></button>
        
    </div>
    <p>Similarity: {similarity===0 ? "" : similarity}</p>
    <p>Speed: {speed} ms</p>
</div>
