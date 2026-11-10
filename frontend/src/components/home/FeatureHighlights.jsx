/**
 * @file components/home/FeatureHighlights.jsx
 * @description 4 large feature blocks with alternating text/visual layout.
 *
 * Features: One Workspace, Specialized Intelligence, Flexible Workflows, AI-Powered Productivity.
 * Each has a mini UI mockup on the visual side.
 */

const features = [
  {
    label: 'Unified',
    title: 'One Unified Workspace',
    description: 'Access every AI capability from one place. No switching between tools — your agents, conversations, and results live together in a single intelligent environment.',
    visual: (
      <div className="rounded-xl border border-surface-800/50 bg-surface-900/60 p-5 space-y-2.5">
        {['💬 Chat', '💻 Coding', '📊 Presentation', '📄 PDF', '🔎 Search'].map((a) => (
          <div key={a} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-800/40 text-sm text-surface-300">
            <span>{a.split(' ')[0]}</span>
            <span className="font-medium">{a.split(' ').slice(1).join(' ')}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: 'Specialized',
    title: 'Specialized Intelligence',
    description: 'Each agent is designed for a specific type of task. A coding agent thinks about code. A presentation agent structures slides. Specialization means better results.',
    visual: (
      <div className="rounded-xl border border-surface-800/50 bg-surface-900/60 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-lg">💻</div>
          <div>
            <p className="text-sm font-semibold text-surface-200">Coding Agent</p>
            <p className="text-xs text-surface-500">Specialized for software</p>
          </div>
        </div>
        <div className="space-y-1.5">
          {['Generate', 'Debug', 'Refactor', 'Explain'].map((c) => (
            <div key={c} className="flex items-center gap-2 text-xs text-surface-400">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: 'Flexible',
    title: 'Flexible Workflows',
    description: 'Move between agents depending on your goal. Start with research, switch to analysis, then create a presentation — all within the same workspace.',
    visual: (
      <div className="rounded-xl border border-surface-800/50 bg-surface-900/60 p-5">
        <div className="flex items-center gap-2 text-xs text-surface-400 mb-3">
          <span className="px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-400 font-medium">Search</span>
          <span className="text-surface-600">→</span>
          <span className="px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 font-medium">Chat</span>
          <span className="text-surface-600">→</span>
          <span className="px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 font-medium">PPT</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 rounded-full bg-surface-800/60 w-full" />
          <div className="h-2 rounded-full bg-surface-800/60 w-4/5" />
          <div className="h-2 rounded-full bg-indigo-500/20 w-3/5" />
        </div>
      </div>
    ),
  },
  {
    label: 'Productive',
    title: 'AI-Powered Productivity',
    description: 'Move from idea to execution to result faster. Let AI handle the heavy lifting while you focus on what matters — your goals and decisions.',
    visual: (
      <div className="rounded-xl border border-surface-800/50 bg-surface-900/60 p-5">
        <div className="space-y-3">
          {[
            { step: 'Idea', pct: '100%', color: 'bg-indigo-500/30' },
            { step: 'Execution', pct: '85%', color: 'bg-violet-500/30' },
            { step: 'Result', pct: '70%', color: 'bg-cyan-500/30' },
          ].map((s) => (
            <div key={s.step}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-surface-400">{s.step}</span>
              </div>
              <div className="h-2 rounded-full bg-surface-800/60">
                <div className={`h-full rounded-full ${s.color}`} style={{ width: s.pct }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const FeatureHighlights = () => (
  <section id="features" className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8 scroll-mt-20">
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="text-center mb-14 sm:mb-16">
        <p className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3">
          Platform
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-50 tracking-tight">
          Why AgentFlow
        </h2>
        <p className="mt-5 text-surface-400 max-w-lg mx-auto text-base sm:text-lg">
          A platform designed around how you actually work.
        </p>
      </div>

      {/* Feature blocks — alternating layout */}
      <div className="space-y-16 sm:space-y-20">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`flex flex-col gap-8 sm:gap-12 items-center ${
              i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`}
          >
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-xs font-bold text-indigo-400/60 uppercase tracking-widest mb-3">
                {f.label}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-surface-100 mb-4">
                {f.title}
              </h3>
              <p className="text-base text-surface-400 leading-relaxed max-w-md mx-auto lg:mx-0">
                {f.description}
              </p>
            </div>

            {/* Visual */}
            <div className="flex-1 w-full max-w-sm lg:max-w-md">
              {f.visual}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureHighlights;
