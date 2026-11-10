/**
 * @file components/home/AgentCard.jsx
 * @description Premium agent card for the homepage Agent Ecosystem section.
 *
 * Features:
 *   - Gradient icon container
 *   - Hover: Y-axis lift, gradient glow border, shadow expansion
 *   - Capability tags
 *   - "Explore Agent →" action indicator
 *   - Responsive sizing
 */

const AgentCard = ({ agent }) => (
  <div
    className="
      group relative flex flex-col rounded-2xl
      border border-surface-800/60 bg-surface-900/60
      p-6 sm:p-7
      transition-all duration-300 ease-out
      hover:border-surface-700/60 hover:-translate-y-1
      hover:shadow-xl hover:shadow-black/20
    "
    style={{
      '--card-glow': agent.glowColor || 'rgba(99, 102, 241, 0.15)',
    }}
  >
    {/* Hover glow effect */}
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${agent.glowColor || 'rgba(99,102,241,0.12)'}, transparent 70%)`,
      }}
      aria-hidden="true"
    />

    {/* Icon */}
    <div className="mb-5">
      <div
        className={`
          inline-flex items-center justify-center w-12 h-12 rounded-xl
          bg-gradient-to-br ${agent.gradient}
          shadow-lg
          text-xl
        `}
        style={{ boxShadow: `0 8px 24px -4px ${agent.glowColor}` }}
      >
        <span role="img" aria-label={agent.name}>
          {agent.icon}
        </span>
      </div>
    </div>

    {/* Name */}
    <h3 className="text-lg font-semibold text-surface-100 mb-2 group-hover:text-white transition-colors">
      {agent.name}
    </h3>

    {/* Description */}
    <p className="text-sm text-surface-400 leading-relaxed flex-1 mb-5">
      {agent.description}
    </p>

    {/* Capability tags */}
    <div className="flex flex-wrap gap-1.5 mb-5">
      {agent.capabilities.map((cap) => (
        <span
          key={cap}
          className="text-xs font-medium px-2.5 py-1 rounded-md bg-surface-800/60 text-surface-400 border border-surface-800/40"
        >
          {cap}
        </span>
      ))}
    </div>

    {/* Action indicator */}
    <div className="flex items-center text-xs font-medium text-surface-500 group-hover:text-indigo-400 transition-colors duration-300">
      Explore Agent
      <svg
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>
);

export default AgentCard;
