/**
 * @file components/home/HomeNavbar.jsx
 * @description Premium sticky navbar for the AgentFlow homepage.
 *
 * Features:
 *   - Sticky positioning with backdrop blur
 *   - Scroll-aware background opacity
 *   - Anchor links to page sections
 *   - Mobile hamburger menu
 *   - Sign In / Get Started CTAs (visual only)
 *
 * Does NOT modify authentication logic. Uses existing /login route for Sign In.
 */

import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Agents', href: '#agents' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
];

const HomeNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      id="home-navbar"
      className={`
        fixed top-0 left-0 right-0 z-50 h-16
        transition-all duration-300
        ${scrolled
          ? 'bg-surface-950/85 backdrop-blur-2xl border-b border-surface-800/50 shadow-lg shadow-black/10'
          : 'bg-transparent border-b border-transparent'}
      `}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl h-full flex items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* ── Logo ─────────────────────────────────── */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2.5 group"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" fill="white" />
            </svg>
          </span>
          <span className="text-lg font-bold text-surface-50 tracking-tight group-hover:text-white transition-colors">
            AgentFlow
          </span>
        </a>

        {/* ── Desktop nav links ─────────────────────── */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3.5 py-2 text-sm font-medium text-surface-400 rounded-lg hover:text-surface-100 hover:bg-surface-800/50 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ── Desktop CTAs ──────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="text-sm font-medium text-surface-400 px-4 py-2 rounded-lg hover:text-surface-100 transition-colors duration-200"
          >
            Sign In
          </a>
          <a
            href="#agents"
            onClick={(e) => handleNavClick(e, '#agents')}
            className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/30 transition-all duration-200"
          >
            Get Started
          </a>
        </div>

        {/* ── Mobile hamburger ──────────────────────── */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-surface-400 hover:text-surface-100 hover:bg-surface-800/50 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
          )}
        </button>
      </div>

      {/* ── Mobile menu overlay ──────────────────── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-surface-950/95 backdrop-blur-2xl">
          <div className="flex flex-col px-6 py-8 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-surface-300 px-4 py-3 rounded-xl hover:text-white hover:bg-surface-800/50 transition-all"
              >
                {link.label}
              </a>
            ))}
            <hr className="my-4 border-surface-800/50" />
            <a
              href="/login"
              className="text-base font-medium text-surface-400 px-4 py-3 rounded-xl hover:text-white hover:bg-surface-800/50 transition-all"
            >
              Sign In
            </a>
            <a
              href="#agents"
              onClick={(e) => handleNavClick(e, '#agents')}
              className="text-base font-semibold text-white text-center px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 mt-2"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;
