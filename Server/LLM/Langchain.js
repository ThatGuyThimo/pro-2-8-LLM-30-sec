import { ChatOpenAI } from "@langchain/openai"
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY, 
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION, 
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME, 
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME, 
})
// const model = new ChatOpenAI({
//     modelName: "gpt-3.5-turbo",
//     openAIApiKey: process.env.OPENAI_API_KEY
// })

 
async function joke() {
    const res = await model.invoke("Tell me a Javascript joke!")
    return res.content 
}

async function chat(req) {
    const res = await model.invoke(req)
    return res.content 
}

async function card(req) {
    const res = await model.invoke(req)
    return res.content 
}



export { joke, chat }