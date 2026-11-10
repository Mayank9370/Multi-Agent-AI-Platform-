/**
 * @file components/home/CapabilitiesSection.jsx
 * @description "What You Can Do" — 4 capability categories (Create, Understand, Research, Improve).
 *
 * Modern feature block cards with icons, titles, and bullet items.
 */

const capabilities = [
  {
    title: 'Create',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    gradient: 'from-violet-500/10 to-purple-500/10',
    items: ['Write content', 'Generate code', 'Build presentations', 'Create structured documents'],
  },
  {
    title: 'Understand',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
    gradient: 'from-cyan-500/10 to-blue-500/10',
    items: ['Analyze PDFs', 'Explain code', 'Summarize documents', 'Extract information'],
  },
  {
    title: 'Research',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    gradient: 'from-emerald-500/10 to-teal-500/10',
    items: ['Search information', 'Explore topics', 'Compare information', 'Organize findings'],
  },
  {
    title: 'Improve',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    gradient: 'from-amber-500/10 to-orange-500/10',
    items: ['Refactor code', 'Improve writing', 'Refine ideas', 'Optimize workflows'],
  },
];

const CapabilitiesSection = () => (
  <section className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="text-center mb-14 sm:mb-16">
        <p className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3">
          Capabilities
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-50 tracking-tight">
          What You Can Do
        </h2>
        <p className="mt-5 text-surface-400 max-w-lg mx-auto text-base sm:text-lg">
          From creation to research — AI that adapts to how you work.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {capabilities.map((cap) => (
          <div
            key={cap.title}
            className={`
              group rounded-2xl border border-surface-800/50
              bg-gradient-to-br ${cap.gradient}
              p-7 sm:p-8
              transition-all duration-300
              hover:border-surface-700/60 hover:shadow-lg hover:shadow-black/10
            `}
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-900/80 border border-surface-800/50">
                {cap.icon}
              </div>
              <h3 className="text-lg font-semibold text-surface-100">{cap.title}</h3>
            </div>

            {/* Items */}
            <ul className="space-y-2.5">
              {cap.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-surface-400">
                  <span className="w-1 h-1 rounded-full bg-surface-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CapabilitiesSection;
