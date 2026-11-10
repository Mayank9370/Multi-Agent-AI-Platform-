/**
 * @file components/home/AgentExplorer.jsx
 * @description Interactive agent selector — frontend state only.
 *
 * Tab buttons let the user preview each agent's details.
 * Uses local React state — no API calls, no Redux, no backend.
 */

import { useState } from 'react';
import homeAgents from './homeAgents.js';

const AgentExplorer = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = homeAgents[activeIdx];

  return (
    <section className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3">
            Explore
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-50 tracking-tight">
            Explore the Agents
          </h2>
          <p className="mt-5 text-surface-400 max-w-lg mx-auto text-base sm:text-lg">
            Select an agent to see what it can do.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {homeAgents.map((agent, i) => (
            <button
              key={agent.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`
                inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-250 cursor-pointer
                ${i === activeIdx
                  ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-lg shadow-indigo-500/5'
                  : 'bg-surface-900/50 text-surface-400 border border-surface-800/50 hover:text-surface-200 hover:border-surface-700/50 hover:bg-surface-800/40'
                }
              `}
            >
              <span>{agent.icon}</span>
              {agent.name.replace(' Agent', '')}
            </button>
          ))}
        </div>

        {/* Agent detail card */}
        <div
          className="relative rounded-2xl border border-surface-800/60 bg-surface-900/60 p-8 sm:p-10 transition-all duration-300"
          style={{
            boxShadow: `0 0 80px -20px ${active.glowColor}`,
          }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-2xl -z-10 transition-all duration-500"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${active.glowColor}, transparent 70%)`,
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
            {/* Icon */}
            <div
              className={`
                flex items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0
                bg-gradient-to-br ${active.gradient} text-2xl
                shadow-xl
              `}
              style={{ boxShadow: `0 12px 32px -8px ${active.glowColor}` }}
            >
              {active.icon}
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-surface-100 mb-3">
                {active.name}
              </h3>
              <p className="text-base text-surface-400 leading-relaxed mb-6">
                {active.detailDescription}
              </p>

              {/* Capabilities */}
              <div className="flex flex-wrap gap-2">
                {active.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="text-sm font-medium px-3.5 py-1.5 rounded-lg bg-surface-800/60 text-surface-300 border border-surface-800/40"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentExplorer;
