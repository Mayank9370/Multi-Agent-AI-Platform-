/**
 * @file components/home/ProductHighlights.jsx
 * @description Product characteristics section — NOT fake statistics.
 *
 * Displays factual product characteristics:
 *   5 Specialized Agents, One Unified Workspace, Multiple AI Workflows, Built for Modern Work.
 */

const highlights = [
  {
    value: '5',
    label: 'Specialized Agents',
    description: 'Chat, Coding, Presentation, PDF, and Search',
  },
  {
    value: '1',
    label: 'Unified Workspace',
    description: 'Everything accessible from one place',
  },
  {
    value: '∞',
    label: 'AI Workflows',
    description: 'Combine agents for complex tasks',
  },
  {
    value: '→',
    label: 'Built for Modern Work',
    description: 'From idea to result, faster',
  },
];

const ProductHighlights = () => (
  <section className="relative py-16 sm:py-20 px-5 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-5xl">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {highlights.map((h) => (
          <div key={h.label} className="text-center">
            <p className="text-3xl sm:text-4xl font-extrabold home-gradient-text mb-2">
              {h.value}
            </p>
            <p className="text-sm font-semibold text-surface-200 mb-1">
              {h.label}
            </p>
            <p className="text-xs text-surface-500">
              {h.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductHighlights;
