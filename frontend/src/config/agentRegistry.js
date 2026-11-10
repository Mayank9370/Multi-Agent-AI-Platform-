/**
 * @file config/agentRegistry.js
 * @description Configuration-driven registry of all AI agents available in AgentFlow.
 *
 * Adding a new agent to the dashboard requires only adding a new object here.
 * No JSX modifications needed — the Dashboard renders from this array.
 *
 * Each entry:
 *   - id:          Unique identifier (used as React key)
 *   - name:        Display name shown on the card
 *   - description: Short description of the agent's capabilities
 *   - icon:        SVG path data (d attribute) for a 24×24 viewBox icon
 *   - color:       Accent color key — maps to a static Tailwind class set in AgentCard
 *   - status:      'active' (clickable, navigates to route) | 'coming-soon' (non-clickable)
 *   - route:       Frontend route path (only used when status === 'active')
 */

const agents = [
  {
    id: 'chat',
    name: 'AI Chat',
    description: 'Chat and interact with AI assistants in real time',
    icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z',
    color: 'indigo',
    status: 'coming-soon',
    route: '/chat',
  },
  {
    id: 'pdf',
    name: 'PDF Agent',
    description: 'Generate and work with PDF documents using AI',
    icon: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v2H8zm0-4h8v2H8z',
    color: 'rose',
    status: 'coming-soon',
    route: '/pdf',
  },
  {
    id: 'image',
    name: 'Image Generation',
    description: 'Create and edit images with AI-powered tools',
    icon: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
    color: 'amber',
    status: 'coming-soon',
    route: '/images',
  },
  {
    id: 'coding',
    name: 'Coding Agent',
    description: 'Build, debug and explain code with AI assistance',
    icon: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
    color: 'emerald',
    status: 'coming-soon',
    route: '/coding',
  },
];

export default agents;
