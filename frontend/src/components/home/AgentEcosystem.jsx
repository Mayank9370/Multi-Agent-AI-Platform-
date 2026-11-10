/**
 * @file components/home/AgentEcosystem.jsx
 * @description "Meet Your AI Agents" section — renders the agent grid.
 *
 * Uses homeAgents.js for static data. Renders AgentCard components
 * in a responsive grid layout.
 */

import homeAgents from './homeAgents.js';
import AgentCard from './AgentCard.jsx';

const AgentEcosystem = () => (
  <section
    id="agents"
    className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8 scroll-mt-20"
  >
    {/* Background */}
    <div className="absolute inset-0 -z-10 home-radial-glow-center" aria-hidden="true" />

    <div className="mx-auto max-w-6xl">
      {/* Section header */}
      <div className="text-center mb-14 sm:mb-16">
        <p className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3">
          Agent Ecosystem
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-50 tracking-tight">
          Meet Your AI Agents
        </h2>
        <p className="mt-5 text-surface-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          Specialized AI assistance for different kinds of work.
        </p>
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {homeAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  </section>
);

export default AgentEcosystem;
