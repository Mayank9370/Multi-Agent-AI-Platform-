/**
 * @file components/home/homeAgents.js
 * @description Homepage-only static data for the 5 AI agents.
 *
 * This file is purely for marketing/presentation purposes.
 * It does NOT modify or replace the application's agent registry
 * in config/agentRegistry.js.
 */

const homeAgents = [
  {
    id: 'chat',
    name: 'Chat Agent',
    icon: '💬',
    gradient: 'from-indigo-500 to-violet-500',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    description:
      'Have natural conversations, brainstorm ideas, summarize information, and get intelligent assistance for any topic.',
    detailDescription:
      'Your AI conversational partner for brainstorming, writing, analysis, and problem-solving. Ask anything and get thoughtful, context-aware responses.',
    capabilities: ['Conversation', 'Brainstorming', 'Summarization', 'Writing'],
  },
  {
    id: 'coding',
    name: 'Coding Agent',
    icon: '💻',
    gradient: 'from-emerald-500 to-cyan-500',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    description:
      'Generate, explain, debug, refactor, and improve code with an AI coding companion.',
    detailDescription:
      'Build, debug, and understand software with intelligent assistance. From generating boilerplate to explaining complex algorithms, your AI pair programmer is ready.',
    capabilities: ['Code Generation', 'Debugging', 'Refactoring', 'Explanation'],
  },
  {
    id: 'presentation',
    name: 'Presentation Agent',
    icon: '📊',
    gradient: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    description:
      'Turn ideas and information into structured, professional presentations effortlessly.',
    detailDescription:
      'Transform raw ideas into polished presentations. Describe your topic and let AI structure slides, write content, and suggest compelling visual narratives.',
    capabilities: ['Slides', 'Structure', 'Content', 'Presentation Ideas'],
  },
  {
    id: 'pdf',
    name: 'PDF Agent',
    icon: '📄',
    gradient: 'from-rose-500 to-pink-500',
    glowColor: 'rgba(244, 63, 94, 0.15)',
    description:
      'Understand, summarize, analyze, and work with PDF documents using AI.',
    detailDescription:
      'Upload any PDF and interact with its contents. Ask questions, extract key information, generate summaries, and analyze documents with contextual intelligence.',
    capabilities: ['Document Analysis', 'Summarization', 'Extraction', 'Question Answering'],
  },
  {
    id: 'search',
    name: 'Search Agent',
    icon: '🔎',
    gradient: 'from-cyan-500 to-blue-500',
    glowColor: 'rgba(6, 182, 212, 0.15)',
    description:
      'Research topics, discover information, and synthesize useful answers from the web.',
    detailDescription:
      'Go beyond simple search. Research topics in depth, synthesize information from multiple sources, and get well-organized answers with references.',
    capabilities: ['Research', 'Discovery', 'Web Search', 'Information Synthesis'],
  },
];

export default homeAgents;
