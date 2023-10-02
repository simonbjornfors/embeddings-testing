<script>
    import {models} from "$lib/stores/models.ts"
    let loading = false;
    let text = ""

    async function speedTest() {
        try{
        if($models.filter(model => model.includeModel).length === 0) {
            alert("Please select at least one model")
            return
        } 
        loading = true
        const res = await fetch("/api/speed-test", 
        {method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text: text !== "" ? text : "Ej specificerad protozosjukdom i tarmen", models: $models})
        }
        )
        const data = await res.json()
        console.log(data)
        let updatedModels = $models.map(m => {
        let foundModel = data.find(d => d.name === m.name);
        if (foundModel) {
                m.time = foundModel.time;
            }
            return m;
        });
        $models = updatedModels;
        loading = false}
        catch(err) {
            loading = false
            console.log(err)
            alert(err)
        }finally {
            loading = false;
        }
    }
</script>
<div class="flex flex-col items-center gap-3 h-full">
    <h1 class="text-xl font-bold">Speed Test</h1>
    <p>Test how long different models take to create an embedding</p>
    <div class="flex flex-col h-1/2 flex-wrap gap-3">
        {#each $models as model}
        <div class="flex flex-col gap-1">

            <div class="flex flex-row justify-between items-center mx-2">
                <label class="label" for={model.name}><span class="label-text text-xl font-bold">{model.name}</span></label>
                <input class="checkbox checkbox-primary" type="checkbox" id={model.name} name="model" bind:checked={model.includeModel}>
            </div>
            <div class="flex flex-row relative">
                
            
            <input disabled class="input w-full" type="text" id={model.name + "-time"} name={model.name + "-time"} bind:value={model.time}>
            <label class="label" for={model.name + "-time"}>
            <span class="absolute right-3 loading loading-spinner loading-xs text-primary" class:hidden={!loading || !model.includeModel}></span></label>
        </div>
        </div>
        {/each}
        
    </div>
    <div class="flex flex-row gap-3">
        <button class="btn btn-primary" on:click={() => { $models.forEach(model => model.includeModel = true); $models = [...$models]; }}>Select All</button>
        <button class="btn btn-secondary" on:click={() => { $models.forEach(model => model.includeModel = false); $models = [...$models]; }}>Deselect All</button>
    </div>
    <div class="form-control w-full max-w-xs">
        <label for="embedding-text" class="label"><span class="label-text text-xs">Embedding Text</span></label>
        <input id="embedding-text" type="text" class="input input-bordered" bind:value={text} placeholder="Ej specificerad protozosjukdom i tarmen">
    </div>
    <button class="btn btn-primary" on:click={speedTest}>Speed Test</button>
</div>

