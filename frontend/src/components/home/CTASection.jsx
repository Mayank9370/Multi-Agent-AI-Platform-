/**
 * @file components/home/CTASection.jsx
 * @description Final call-to-action section before the footer.
 *
 * Strong visual treatment with gradient glow and dual CTA buttons.
 * Buttons are visual only — no new backend functionality.
 */

const CTASection = () => {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl animate-glow-pulse" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-50 tracking-tight leading-tight">
          Ready to work with AI{' '}
          <span className="home-gradient-text">differently</span>?
        </h2>

        <p className="mt-6 text-base sm:text-lg text-surface-400 max-w-lg mx-auto leading-relaxed">
          Choose an agent, describe your goal, and explore a smarter way to work with AI.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#agents"
            onClick={(e) => handleScroll(e, 'agents')}
            className="
              inline-flex items-center gap-2 px-8 py-4 rounded-xl
              text-sm font-semibold text-white
              bg-gradient-to-r from-indigo-600 to-violet-600
              hover:from-indigo-500 hover:to-violet-500
              shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/35
              transition-all duration-300 hover:-translate-y-0.5
            "
          >
            Get Started
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="#agents"
            onClick={(e) => handleScroll(e, 'agents')}
            className="
              inline-flex items-center gap-2 px-8 py-4 rounded-xl
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
    </section>
  );
};

export default CTASection;
