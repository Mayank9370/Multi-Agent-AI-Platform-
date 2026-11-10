/**
 * @file components/home/WorkspacePreview.jsx
 * @description Large product-preview section showing a polished mock interface.
 *
 * Left sidebar with workspace navigation, main area with a realistic AI interaction flow.
 * Purely visual — no backend integration.
 */

const sidebarAgents = [
  { emoji: '💬', label: 'Chat' },
  { emoji: '💻', label: 'Coding' },
  { emoji: '📊', label: 'Presentation' },
  { emoji: '📄', label: 'PDF' },
  { emoji: '🔎', label: 'Search' },
];

const recentItems = [
  { label: 'AI Research', color: 'bg-indigo-500' },
  { label: 'Project Alpha', color: 'bg-emerald-500' },
  { label: 'Pitch Deck', color: 'bg-amber-500' },
];

const workflowSteps = [
  { agent: 'Search Agent', status: 'Researching information', done: true },
  { agent: 'Chat Agent', status: 'Organizing insights', done: true },
  { agent: 'Presentation Agent', status: 'Creating presentation structure', done: false, active: true },
];

const WorkspacePreview = () => (
  <section className="relative py-16 sm:py-24 px-5 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      {/* ── Section header ─────────────────────── */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-50 tracking-tight">
          A workspace built for{' '}
          <span className="home-gradient-text">intelligent work</span>
        </h2>
        <p className="mt-4 text-surface-400 max-w-xl mx-auto">
          Everything you need — organized, accessible, and powered by AI agents.
        </p>
      </div>

      {/* ── Workspace mockup ───────────────────── */}
      <div className="relative">
        {/* Glow */}
        <div className="absolute -inset-6 bg-gradient-to-r from-indigo-600/5 via-violet-600/5 to-cyan-600/5 rounded-3xl blur-3xl -z-10" aria-hidden="true" />

        <div className="rounded-2xl border border-surface-800/60 bg-surface-900/70 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden animate-float">
          {/* Window title bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-surface-800/50 bg-surface-900/50">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-4 text-xs font-medium text-surface-500">AgentFlow Workspace</span>
          </div>

          <div className="flex min-h-[360px] sm:min-h-[420px]">
            {/* ── Sidebar ──────────────────────── */}
            <div className="hidden sm:flex flex-col w-56 border-r border-surface-800/50 p-4">
              <p className="text-[11px] font-semibold text-surface-500 uppercase tracking-widest mb-3">
                Workspace
              </p>

              {/* Agents */}
              <p className="text-[11px] font-semibold text-surface-500 uppercase tracking-widest mb-2 mt-2">
                Agents
              </p>
              <div className="space-y-0.5">
                {sidebarAgents.map((a, i) => (
                  <div
                    key={a.label}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                      i === 4
                        ? 'bg-indigo-500/10 text-indigo-300'
                        : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800/40'
                    }`}
                  >
                    <span className="text-sm">{a.emoji}</span>
                    <span className="font-medium">{a.label}</span>
                  </div>
                ))}
              </div>

              {/* Recent */}
              <p className="text-[11px] font-semibold text-surface-500 uppercase tracking-widest mb-2 mt-6">
                Recent
              </p>
              <div className="space-y-0.5">
                {recentItems.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-surface-400 hover:text-surface-200 hover:bg-surface-800/40 transition-colors"
                  >
                    <span className={`w-2 h-2 rounded-full ${r.color}`} />
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Main panel ───────────────────── */}
            <div className="flex-1 p-6 sm:p-8">
              <p className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-3">
                Your task
              </p>
              <p className="text-base sm:text-lg text-surface-200 leading-relaxed mb-8">
                Research the latest AI trends and turn them into a presentation.
              </p>

              <p className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-4">
                AgentFlow
              </p>

              <div className="space-y-3">
                {workflowSteps.map((step) => (
                  <div key={step.agent} className="flex items-start gap-3">
                    <span className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-full ${
                      step.done
                        ? 'bg-emerald-500/15'
                        : 'bg-indigo-500/15'
                    }`}>
                      {step.done ? (
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" className="text-emerald-400" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-surface-200">{step.agent}</p>
                      <p className="text-xs text-surface-500">{step.done ? '✓' : '⟳'} {step.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WorkspacePreview;
