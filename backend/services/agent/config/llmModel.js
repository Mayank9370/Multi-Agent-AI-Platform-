import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    // other params...
})


const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    temperature: 0,
    // other params...
})

export const getModel = async (agent) => {
    if(agent === "groq") {
        if(!process.env.GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY not found in environment variables");
        }
        return groq;
    }
    if(agent === "gemini") {
        if(!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY not found in environment variables");
        }
        return gemini;
    }
    throw new Error("Invalid agent specified");
}