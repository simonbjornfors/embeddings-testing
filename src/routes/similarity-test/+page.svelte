<script lang="ts">
    import {models} from "$lib/stores/models.ts"
    export let data: {icd10:[{id:number, title:string, code:string, connected_synonyms?:{title:string, active:boolean}[]}], search_icd10?:string, text?:string};
    let loading: boolean = false;
    let text: string = data.text ?? '';
    let selectedIcd10:{id:number, title:string, code:string, connected_synonyms?:{title:string, active:boolean}[]} = data.icd10[0]
    let activeModel: string;
    let progress: number = 0;
    let searchIcd10: string = data.search_icd10 ?? '';

    async function similarityTest() {
        try{
        if($models.filter(model => model.includeModel).length === 0) {
            alert("Please select at least one model")
            return
        } 

        loading = true
        for(let model of $models) {
            let totalTime = 0;
            let nbrOfEmbeddings = 2;
            progress = Math.round(($models.indexOf(model) / $models.length) * 100)
            console.log(model)
            activeModel = model.name
            $models = [...$models];
            if(!model.includeModel) continue;

        console.log("text:", text)
        console.log("icd10:", selectedIcd10.title)
        console.log("model:", model.modelName)
        const res = await fetch(`/api/get-embedding`, 
        {method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text: text === "" ? "Ont i axeln" : text, model: model.modelName, useQuantized: model.useQuantized ?? false, modelType: model.modelType})
        }
        )
        const data = await res.json();
        totalTime += data.time;
        model.embedding = model.modelType === "onnx-model" ? Object.values(data.embedding) : data.embedding;
        console.log("embedding: ", data.embedding);
        let startTime = performance.now();
        const similarityResponse = await fetch(`/api/synonym-compare`,
        {method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({embedding: model.embedding, text2: selectedIcd10.title , model: model.modelName, useQuantized: model.useQuantized ?? false, modelType: model.modelType})
        }
        )
        totalTime += performance.now() - startTime;
        const similarityData = await similarityResponse.json();
        model.similarity = similarityData.similarity;
        if(selectedIcd10.connected_synonyms){
        for(let synonym of selectedIcd10.connected_synonyms){
            if(selectedIcd10.connected_synonyms.indexOf(synonym) > 2 || synonym.title===null) break;
            console.log("synonym: ", synonym)
            startTime = performance.now();
            const synonymResponse = await fetch(`/api/synonym-compare`,
            {method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({embedding: model.embedding, text2: synonym.title , model: model.modelName, useQuantized: model.useQuantized ?? false, modelType: model.modelType})
            }
            )
            totalTime += performance.now() - startTime;
            const synonymData:{similarity:number} = await synonymResponse.json();
            model.synonyms.push(synonymData.similarity)
            nbrOfEmbeddings++;
        }   
    }
        model.time = Math.round(totalTime);
        model.averageTime = Math.round(totalTime / nbrOfEmbeddings);
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
            activeModel = "";
            $models = [...$models];
        }
    }
    function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function submit(e: Event) {
		searchIcd10 = e.target?.search_icd10.value ?? searchIcd10;
		window.location = `?search_icd10=${searchIcd10}&text=${text}`;
	}
</script>
<div class="flex flex-col items-center gap-3 h-full w-full">
    <h1 class="text-xl font-bold">Similarity Test</h1>
    <p>Compare similarity for search phrases accoriding to each model</p>
    <div class="form-control w-full flex-col gap-3 justify-center items-center text-center ">
        <div class="flex flex-col gap-1 w-1/3 {loading ? "opacity-50" : ""}">
            <label for="embedding_text" class="label "><span class="label-text text-xs absolute">ICD10</span>
            </label>
            <select class="select select-sm relative rounded" disabled={loading} bind:value={selectedIcd10}>
                {#each data.icd10 as icd10}
                    <option value={icd10}>{icd10.title} {icd10.code}</option>
                {/each}
            </select>
            <form
				class="flex flex-row gap-1 items-center"
				action="/search"
				on:submit|preventDefault={submit}
			>
				<input
					name="search_icd10"
                    id="search_icd10"
					type="text"
					placeholder="Search for ICD10"
					class="w-full form-control input input-sm rounded relative"
					bind:value={searchIcd10}
                    disabled={loading}
				/>
				<button type="submit" disabled={loading} class="btn btn-sm btn-secondary">Search</button>
			</form>
            <div class="flex flex-col">
                <label for="embedding_text" class="label"><span class="label-text text-xs absolute">Search Phrase to compare</span>
                </label>
                <input id="embedding_text" type="text" class="input input-sm rounded relative" bind:value={text} placeholder="Ont i axeln" disabled={loading}>
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
                  <th class="w-1/12">Synonym 1</th>
                  <th class="w-1/12">Synonym 2</th>
                  <th class="w-1/12">Synonym 3</th>
                </tr>
              </thead>
              <tbody>
                {#each $models as model, i}
                <tr class="text-xs {activeModel === model.name ? "bg-accent text-accent-content" : i % 2 === 0 ? "bg-base-200" : ""}">
                  <td><input class="checkbox checkbox-xs checkbox-primary" type="checkbox" id={model.name} name="model" bind:checked={model.includeModel} disabled={loading}></td>
                  <td>{model.name}</td>
                  <td>{model.time ? model.time + "ms" : ""}</td>
                  <td>{model.time ? model.averageTime + "ms" : ""}</td>
                  <td>{model.similarity ?? ""}</td>
                  <td>{model.synonyms[0] ?? ""}</td>
                  <td>{model.synonyms[1]  ?? ""}</td>
                  <td>{model.synonyms[2]  ?? ""}</td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

