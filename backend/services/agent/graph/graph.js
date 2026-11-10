import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { chatAgent } from "../agents/chatAgent.js";
import { pdfAgent } from "../agents/pdfAgent.js";
import { pptAgent } from "../agents/pptAgent.js";
import { imageAgent } from "../agents/imagesAgent.js";
import { searchAgent } from "../agents/searchAgent.js";
import { router } from "./router.js";
import { codingAgent } from "../agents/codingAgent.js";

const workFlow = new StateGraph(agentState)

// Adding nodes
workFlow.addNode('router',router)
workFlow.addNode('chatAgent',chatAgent)
workFlow.addNode('pdfAgent',pdfAgent)
workFlow.addNode('pptAgent',pptAgent)
workFlow.addNode('imageAgent',imageAgent)
workFlow.addNode('searchAgent',searchAgent)
workFlow.addNode('codingAgent',codingAgent)

// Edges
workFlow.addEdge('__start__',router)
workFlow.addConditionalEdges('router',(state) => {
    switch(state.agentUsed){
        case 'chat':
            return 'chatAgent'
        case 'pdf':
            return 'pdfAgent'
        case 'ppt':
            return 'pptAgent'
        case 'image':
            return 'imageAgent'
        case 'search':
            return 'searchAgent'
        case 'coding':
            return 'codingAgent'
        default:
            return 'chatAgent'
    }
},{
    chat:chatAgent,
    pdf:pdfAgent,
    ppt:pptAgent,
    image:imageAgent,
    search:searchAgent,
    coding:codingAgent
})

// search to chat agent.
workFlow.addEdge('searchAgent','chatAgent')



workFlow.addEdge('chatAgent','__end__')
workFlow.addEdge('pdfAgent','__end__')
workFlow.addEdge('pptAgent','__end__')
workFlow.addEdge('imageAgent','__end__')
workFlow.addEdge('codingAgent','__end__')

const graph = workFlow.compile()

export default graph