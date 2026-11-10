/**
 * @file components/home/HomeFooter.jsx
 * @description Professional 4-column footer for the AgentFlow homepage.
 *
 * Links are visual placeholders — only functional if the corresponding
 * routes/pages already exist. Does not create new pages or routes.
 */

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Agents', href: '#agents' },
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
    ],
  },
  {
    title: 'Agents',
    links: [
      { label: 'Chat', href: '#agents' },
      { label: 'Coding', href: '#agents' },
      { label: 'Presentation', href: '#agents' },
      { label: 'PDF', href: '#agents' },
      { label: 'Search', href: '#agents' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Help', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
];

const HomeFooter = () => {
  const currentYear = new Date().getFullYear();

  const handleAnchor = (e, href) => {
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-surface-800/40 pt-16 pb-10 px-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Top — Brand + Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                </svg>
              </span>
              <span className="text-base font-bold text-surface-100">AgentFlow</span>
            </div>
            <p className="text-sm text-surface-500 leading-relaxed max-w-xs">
              AI workspace for modern work — powered by specialized agents.
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchor(e, link.href)}
                      className="text-sm text-surface-500 hover:text-surface-200 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom — Copyright */}
        <div className="pt-8 border-t border-surface-800/40">
          <p className="text-xs text-surface-600 text-center sm:text-left">
            &copy; {currentYear} AgentFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
