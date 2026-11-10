/**
 * @file components/home/UseCasesSection.jsx
 * @description "Built for Different Kinds of Work" — use-case persona cards.
 *
 * Responsive grid of cards for Developers, Students, Researchers, Professionals, Creators.
 */

const useCases = [
  {
    persona: 'Developers',
    emoji: '👨‍💻',
    description: 'Build, debug, explain, and improve software faster with an AI coding agent.',
    accent: 'border-emerald-500/20 hover:border-emerald-500/40',
    glow: 'group-hover:bg-emerald-500/5',
  },
  {
    persona: 'Students',
    emoji: '🎓',
    description: 'Research topics, understand documents, and create presentations with AI help.',
    accent: 'border-amber-500/20 hover:border-amber-500/40',
    glow: 'group-hover:bg-amber-500/5',
  },
  {
    persona: 'Researchers',
    emoji: '🔬',
    description: 'Search, analyze documents, and synthesize information from multiple sources.',
    accent: 'border-cyan-500/20 hover:border-cyan-500/40',
    glow: 'group-hover:bg-cyan-500/5',
  },
  {
    persona: 'Professionals',
    emoji: '💼',
    description: 'Create presentations, analyze documents, and accelerate everyday work with AI.',
    accent: 'border-violet-500/20 hover:border-violet-500/40',
    glow: 'group-hover:bg-violet-500/5',
  },
  {
    persona: 'Creators',
    emoji: '✨',
    description: 'Brainstorm, write, organize, and transform ideas into polished content.',
    accent: 'border-rose-500/20 hover:border-rose-500/40',
    glow: 'group-hover:bg-rose-500/5',
  },
];

const UseCasesSection = () => (
  <section className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="text-center mb-14 sm:mb-16">
        <p className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3">
          Use Cases
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-50 tracking-tight">
          Built for Different Kinds of Work
        </h2>
        <p className="mt-5 text-surface-400 max-w-lg mx-auto text-base sm:text-lg">
          One platform that adapts to what you do.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {useCases.map((uc) => (
          <div
            key={uc.persona}
            className={`
              group relative rounded-2xl border bg-surface-900/40
              p-7 transition-all duration-300 hover:-translate-y-0.5
              hover:shadow-lg hover:shadow-black/10
              ${uc.accent}
            `}
          >
            {/* Background glow on hover */}
            <div className={`absolute inset-0 rounded-2xl transition-colors duration-500 -z-10 ${uc.glow}`} aria-hidden="true" />

            <span className="text-3xl mb-4 block" role="img" aria-label={uc.persona}>
              {uc.emoji}
            </span>
            <h3 className="text-lg font-semibold text-surface-100 mb-2">
              {uc.persona}
            </h3>
            <p className="text-sm text-surface-400 leading-relaxed">
              {uc.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCasesSection;
