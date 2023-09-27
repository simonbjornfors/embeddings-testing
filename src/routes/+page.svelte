<script>
    let loading = false;
    let text = ""
    let models= [
        {
            includeModel: false,
            time: null, 
            modelName: "text-embedding-ada-002",
            embedding: null
        },
        {
            includeModel:false,
            time: null, 
            modelName: "e5-small-v2",
            embedding: null
        },
        {
            includeModel:false,
            time: null, 
            modelName: "multilingual-e5-large",
            embedding: null
        }
    ]

    async function speedTest() {
        if(models.filter(model => model.includeModel).length === 0) {
            alert("Please select at least one model")
            return
        } 
        loading = true
        const res = await fetch("/api/speed-test", 
        {method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text: text !== "" ? text : "Ej specificerad protozosjukdom i tarmen", models: models})
        }
        )
        const data = await res.json()
        console.log(data)
        models = data
        loading = false
    }

</script>
<div class="flex flex-col items-center gap-3">
    <h1 class="text-xl font-bold">Speed Test</h1>
    <p>Test how long different models take to create an embedding</p>
    <div class="flex flex-col">
        {#each models as model}
            <div class="flex flex-row justify-between items-center mx-2">
                <label class="label" for={model.modelName}><span class="label-text text-xl font-bold">{model.modelName}</span></label>
                <input class="checkbox checkbox-primary" type="checkbox" id={model.modelName} name="model" bind:checked={model.includeModel}>
            </div>
            <input disabled class="input input-disabled" type="text" id={model.modelName + "-time"} name={model.modelName + "-time"} bind:value={model.time}>
        {/each}
        
    </div>
    <input type="text" class="input input-bordered" bind:value={text} placeholder="Text">
    <button class="btn btn-primary" on:click={speedTest}>Speed Test</button>
<span class="loading loading-spinner loading-xs" class:hidden={!loading}></span>
</div>

