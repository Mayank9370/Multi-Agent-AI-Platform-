/**
 * @file components/home/HeroSection.jsx
 * @description Hero section — primary visual focal point of the new homepage.
 *
 * Features:
 *   - Strong headline with gradient text accent
 *   - Supporting subtext
 *   - Dual CTAs (Get Started + Explore Agents)
 *   - Animated AI workspace mockup card
 *   - Radial gradient background glow
 *   - CSS entrance animations
 */

const agentTabs = [
  { emoji: '💬', label: 'Chat' },
  { emoji: '💻', label: 'Code' },
  { emoji: '📊', label: 'PPT' },
  { emoji: '📄', label: 'PDF' },
  { emoji: '🔎', label: 'Search' },
];

const HeroSection = () => {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32 px-5 sm:px-6 lg:px-8"
    >
      {/* ── Background effects ─────────────────────── */}
      <div className="absolute inset-0 -z-10 home-grid-bg" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 home-radial-glow" aria-hidden="true" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl animate-glow-pulse -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        {/* ── Text block ───────────────────────────── */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-surface-800/60 bg-surface-900/50 text-xs font-medium text-surface-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI Agent Workspace
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-surface-50 sm:text-5xl lg:text-7xl leading-[1.1]">
            One AI Workspace.
            <br />
            <span className="home-gradient-text">Every Agent You Need.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-surface-400 max-w-2xl mx-auto leading-relaxed">
            AgentFlow brings specialized AI agents together in one workspace —
            helping you chat, code, research, analyze documents, create
            presentations, and accomplish more with AI.
          </p>

          {/* ── CTAs ─────────────────────────────────── */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#agents"
              onClick={(e) => handleScroll(e, 'agents')}
              className="
                inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                text-sm font-semibold text-white
                bg-gradient-to-r from-indigo-600 to-violet-600
                hover:from-indigo-500 hover:to-violet-500
                shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/35
                transition-all duration-300 hover:-translate-y-0.5
              "
            >
              Get Started
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z" clipRule="evenodd" /></svg>
            </a>
            <a
              href="#agents"
              onClick={(e) => handleScroll(e, 'agents')}
              className="
                inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                text-sm font-semibold text-surface-300
                border border-surface-700/60 bg-surface-900/40
                hover:bg-surface-800/70 hover:text-white hover:border-surface-600
                transition-all duration-300
              "
            >
              Explore Agents
            </a>
          </div>
        </div>

        {/* ── Workspace Mockup ───────────────────────── */}
        <div className="mt-16 sm:mt-20 animate-fade-in-up-slow">
          <div className="relative mx-auto max-w-3xl">
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/10 via-violet-600/10 to-cyan-600/10 rounded-3xl blur-2xl -z-10" aria-hidden="true" />

            <div className="rounded-2xl border border-surface-800/60 bg-surface-900/80 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-surface-800/50">
                <span className="w-3 h-3 rounded-full bg-surface-700/60" />
                <span className="w-3 h-3 rounded-full bg-surface-700/60" />
                <span className="w-3 h-3 rounded-full bg-surface-700/60" />
                <span className="ml-4 text-xs font-medium text-surface-500">AgentFlow</span>
              </div>

              <div className="p-6 sm:p-8">
                {/* Agent tabs */}
                <p className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-3">
                  AI Agents
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {agentTabs.map((tab, i) => (
                    <span
                      key={tab.label}
                      className={`
                        inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all
                        ${i === 0
                          ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                          : 'bg-surface-800/50 text-surface-400 border border-surface-800/40 hover:border-surface-700/60'}
                      `}
                    >
                      <span>{tab.emoji}</span>
                      {tab.label}
                    </span>
                  ))}
                </div>

                {/* Input area */}
                <div className="rounded-xl border border-surface-800/50 bg-surface-950/50 px-5 py-4 mb-6">
                  <p className="text-sm text-surface-500">What would you like to accomplish?</p>
                  <p className="mt-2 text-base text-surface-200 italic">
                    &ldquo;Create a presentation about the future of artificial intelligence&rdquo;
                  </p>
                </div>

                {/* Progress steps */}
                <div className="space-y-2.5">
                  {[
                    { text: 'Research completed', delay: '0' },
                    { text: 'Information organized', delay: '0.1s' },
                    { text: 'Slides generated', delay: '0.2s' },
                    { text: 'Presentation ready', delay: '0.3s' },
                  ].map((step) => (
                    <div key={step.text} className="flex items-center gap-3 text-sm">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15">
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" className="text-emerald-400" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-surface-300">{step.text}</span>
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
};

export default HeroSection;
