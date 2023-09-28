<script>
    let loading = false;
    let text = ""
    let models= [
        {
            includeModel: true,
            time: null, 
            name: "Ada-002",
            embedding: null,
            modelName: "text-embedding-ada-002"
        },
        {
            includeModel:true,
            time: null, 
            name: "e5-small-v2",
            embedding: null,
            modelName:"intfloat/e5-small-v2"
        },
        {
            includeModel:true,
            time: null, 
            name: "multilingual-e5-large",
            embedding: null,
            modelName:"intfloat/multilingual-e5-large"
        },
        {
            includeModel:true,
            time: null, 
            name: "bge-large-en-v1.5",
            embedding: null,
            modelName:"BAAI/bge-large-en-v1.5"
        }
        ,
        {
            includeModel:true,
            time: null, 
            name: "bge-large-en",
            embedding: null,
            modelName:"barisaydin/bge-large-en"
        }
        ,
        {
            includeModel:true,
            time: null, 
            name: "bge-base-en-v1.5",
            embedding: null,
            modelName:"BAAI/bge-base-en-v1.5"
        }
        ,
        {
            includeModel:true,
            time: null, 
            name: "bge-base-en",
            embedding: null,
            modelName:"barisaydin/bge-base-en"
        }
        ,
        {
            includeModel:true,
            time: null, 
            name: "gte-base",
            embedding: null,
            modelName:"barisaydin/gte-base"
        }
        ,
        {
            includeModel:true,
            time: null, 
            name: "gte-large",
            embedding: null,
            modelName:"barisaydin/gte-large"
        },
        {
            includeModel:true,
            time: null, 
            name: "bge-small-en-v1.5",
            embedding: null,
            modelName:"BAAI/bge-small-en-v1.5"
        },
        {
            includeModel:true,
            time: null, 
            name: "multilingual-e5-base",
            embedding: null,
            modelName:"intfloat/multilingual-e5-base"
        },
        {
            includeModel:true,
            time: null, 
            name: "all-MiniLM-L6-v2",
            embedding: null,
            modelName:"Xenova/all-MiniLM-L6-v2"
        }

    ]

    async function speedTest() {
        try{
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
        loading = false}
        catch(err) {
            loading = false
            console.log(err)
            alert(err)
        }finally {
            loading = false
        }
    }

</script>
<div class="flex flex-col items-center gap-3 h-full">
    <h1 class="text-xl font-bold">Speed Test</h1>
    <p>Test how long different models take to create an embedding</p>
    <div class="flex flex-col h-1/2 flex-wrap gap-3">
        {#each models as model}
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
    <input type="text" class="input input-bordered" bind:value={text} placeholder="Text">
    <button class="btn btn-primary" on:click={speedTest}>Speed Test</button>
<span class="loading loading-spinner loading-lg text-primary" class:hidden={!loading}></span>
</div>

