/**
 * @file components/home/AgentWorkflow.jsx
 * @description Visual multi-agent workflow diagram.
 *
 * Shows: Goal → AI Workspace → multiple agents → Final Result
 * CSS-based flow visualization with connecting lines and icon nodes.
 * Purely visual — no actual multi-agent orchestration.
 */

const agents = [
  { emoji: '🔎', label: 'Search', color: 'border-cyan-500/30 bg-cyan-500/10' },
  { emoji: '💬', label: 'Chat', color: 'border-indigo-500/30 bg-indigo-500/10' },
  { emoji: '💻', label: 'Code', color: 'border-emerald-500/30 bg-emerald-500/10' },
];

const AgentWorkflow = () => (
  <section className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8">
    {/* Background */}
    <div className="absolute inset-0 -z-10 home-radial-glow-center" aria-hidden="true" />

    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="text-center mb-14 sm:mb-16">
        <p className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3">
          Multi-Agent Workflow
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-50 tracking-tight">
          Agents Working Together
        </h2>
        <p className="mt-5 text-surface-400 max-w-lg mx-auto text-base sm:text-lg">
          Different agents can handle different parts of your workflow.
        </p>
      </div>

      {/* Flow diagram */}
      <div className="flex flex-col items-center gap-0">
        {/* Your Goal */}
        <div className="relative flex items-center justify-center px-8 py-4 rounded-xl border border-surface-700/50 bg-surface-900/80 shadow-lg shadow-black/10">
          <span className="text-sm font-semibold text-surface-200">🎯 Your Goal</span>
        </div>

        {/* Connector line */}
        <div className="w-px h-10 bg-gradient-to-b from-surface-700/50 to-indigo-500/30" aria-hidden="true" />

        {/* AI Workspace hub */}
        <div className="relative flex items-center justify-center px-8 py-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 shadow-lg shadow-indigo-500/5">
          <span className="text-sm font-semibold text-indigo-300">⚡ AI Workspace</span>
        </div>

        {/* Connector line down + branch */}
        <div className="w-px h-8 bg-gradient-to-b from-indigo-500/30 to-surface-700/30" aria-hidden="true" />

        {/* Horizontal branch container */}
        <div className="relative w-full max-w-md">
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-px bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-emerald-500/20 -translate-y-1/2" aria-hidden="true" />

          {/* Agent nodes */}
          <div className="flex items-center justify-between px-4">
            {agents.map((agent) => (
              <div key={agent.label} className="flex flex-col items-center gap-2 relative z-10">
                <div className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border ${agent.color} shadow-lg shadow-black/10 transition-transform duration-300 hover:scale-110`}>
                  <span className="text-xl sm:text-2xl">{agent.emoji}</span>
                </div>
                <span className="text-xs font-medium text-surface-400">{agent.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connector line down from branch */}
        <div className="w-px h-8 bg-gradient-to-b from-surface-700/30 to-emerald-500/30" aria-hidden="true" />

        {/* Final Result */}
        <div className="relative flex items-center justify-center px-8 py-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 shadow-lg shadow-emerald-500/5">
          <span className="text-sm font-semibold text-emerald-300">✅ Final Result</span>
        </div>
      </div>
    </div>
  </section>
);

export default AgentWorkflow;
