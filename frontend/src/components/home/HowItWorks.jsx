/**
 * @file components/home/HowItWorks.jsx
 * @description 3-step workflow section — Choose Agent → Describe Goal → Get Result.
 *
 * Connected horizontal timeline on desktop, vertical stack on mobile.
 * Step number badges with gradient accents.
 */

const steps = [
  {
    number: '01',
    title: 'Choose an Agent',
    description: 'Select the specialized AI agent that matches your task — from coding to research to presentations.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Describe Your Goal',
    description: 'Tell the agent what you want to accomplish — in plain language, the way you naturally think about it.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Get Your Result',
    description: 'The AI agent helps transform your request into a useful, actionable result — fast.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const HowItWorks = () => (
  <section
    id="how-it-works"
    className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8 scroll-mt-20"
  >
    <div className="mx-auto max-w-5xl">
      {/* Section header */}
      <div className="text-center mb-14 sm:mb-16">
        <p className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3">
          Simple Process
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-50 tracking-tight">
          How AgentFlow Works
        </h2>
        <p className="mt-5 text-surface-400 max-w-lg mx-auto text-base sm:text-lg">
          Three steps to move from idea to result.
        </p>
      </div>

      {/* Steps */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
        {/* Connecting line (desktop only) */}
        <div
          className="hidden lg:block absolute top-14 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-cyan-500/30"
          aria-hidden="true"
        />

        {steps.map((step) => (
          <div key={step.number} className="relative text-center">
            {/* Step number badge */}
            <div className="relative z-10 mx-auto mb-6 flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-900 border border-surface-800/60 shadow-lg shadow-black/10">
              {step.icon}
            </div>

            {/* Number */}
            <p className="text-xs font-bold text-indigo-400/60 uppercase tracking-widest mb-2">
              Step {step.number}
            </p>

            {/* Title */}
            <h3 className="text-lg font-semibold text-surface-100 mb-3">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-surface-400 leading-relaxed max-w-xs mx-auto">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
