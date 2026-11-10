import { getModel } from "../config/llmModel"

export const router = async (state) => {
    const llm = getModel("router");

    const prompt = `
    You are an agent router

    Avaliable agents:
    - chat
    - coding
    - pdf
    - ppt
    - search
    - images

    Rules:

    chat: 
    General convertaion, questions, information seeking, explanations

    coding: 
    Generating code snippets, debugging, code optimization, explaining code

    pdf: 
    Creating PDFs from text or data, summarising PDFs, extracting text from PDFs

    ppt: 
    Creating presentations from text or data, summarizing PPT, generating slides

    search: 
    Search the web for current information, internet lookup, news, weather

    images: 
    Generating images from text, text-to-image, image generation

    return only one word chat, search, coding, ppt, pdf.

    user Query : ${state.prompt}

    return only one word

    `

    const res = await llm.invoke(prompt);
    console.log(res);
    

    return {
        ...state,
        usedAgent: res.content.trim().toLowerCase()
    }
}