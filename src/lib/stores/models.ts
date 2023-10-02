import {writable} from 'svelte/store'

export const models = writable([
         {
                includeModel: true,
                time: null, 
                name: "Ada-002",
                embedding: null,
                modelName: "text-embedding-ada-002",
                modelType: "openai-ada-2"
            }, 
            {
                includeModel:true,
                time: null, 
                name: "e5-small-v2",
                embedding: null,
                modelName:"intfloat/e5-small-v2",
                modelType: "huggingface-model"
            },
            {
                includeModel:true,
                time: null, 
                name: "multilingual-e5-large",
                embedding: null,
                modelName:"intfloat/multilingual-e5-large",
                modelType: "huggingface-model"
                
            },
            {
                includeModel:true,
                time: null, 
                name: "bge-large-en-v1.5",
                embedding: null,
                modelName:"BAAI/bge-large-en-v1.5",
                modelType: "huggingface-model"
                
            }
            ,
            {
                includeModel:true,
                time: null, 
                name: "bge-large-en",
                embedding: null,
                modelName:"barisaydin/bge-large-en",
                modelType: "huggingface-model"
                
            }
            ,
            {
                includeModel:true,
                time: null, 
                name: "bge-base-en-v1.5",
                embedding: null,
                modelName:"BAAI/bge-base-en-v1.5",
                modelType: "huggingface-model"
                
            }
            ,
            {
                includeModel:true,
                time: null, 
                name: "bge-base-en",
                embedding: null,
                modelName:"barisaydin/bge-base-en",
                modelType: "huggingface-model"
                
            }
            ,
            {
                includeModel:true,
                time: null, 
                name: "gte-base",
                embedding: null,
                modelName:"barisaydin/gte-base",
                modelType: "huggingface-model"
                
            }
            ,
            {
                includeModel:true,
                time: null, 
                name: "gte-large",
                embedding: null,
                modelName:"barisaydin/gte-large",
                modelType: "huggingface-model"
                
            },
            {
                includeModel:true,
                time: null, 
                name: "bge-small-en-v1.5",
                embedding: null,
                modelName:"BAAI/bge-small-en-v1.5",
                modelType: "huggingface-model"
                
            },
            {
                includeModel:true,
                time: null, 
                name: "multilingual-e5-base",
                embedding: null,
                modelName:"intfloat/multilingual-e5-base",
                modelType: "huggingface-model"
                
            },
            {
                includeModel:true,
                time: null, 
                name: "all-MiniLM-L6-v2-ONNX",
                embedding: null,
                modelName:"Xenova/all-MiniLM-L6-v2",
                modelType: "onnx-model"
                
            },
            {
                includeModel:true,
                time: null, 
                name: "gte-base-ONNX",
                embedding: null,
                modelName:"barisaydin/gte-base",
                modelType: "onnx-model"
            }
    
        ])
