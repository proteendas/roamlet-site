import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import {DownloadButton} from './DownloadButton';
import {Wordmark} from './Brand';

/**
 * Minimal fixed nav. It starts transparent over the hero and only grows a
 * background once you have scrolled past it — the hero is the page's one piece
 * of uninterrupted whitespace and a bar sitting on it costs more than it gives.
 *
 * In-page anchors are written as `/#id` so they work from the What's new and
 * Contact routes too; `ScrollManager` in App.tsx handles the landing.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const {pathname} = useLocation();
  const onHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || !onHome
          ? 'border-b border-paper-300 bg-paper/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" aria-label="Roamlet home" className="shrink-0">
          <Wordmark />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/#features" label="Features" className="hidden sm:inline-flex" />
          <NavLink to="/whats-new" label="What's new" />
          <NavLink to="/contact" label="Contact" />
          <DownloadButton size="md" className="ml-1 hidden md:inline-flex" />
        </div>
      </nav>
    </header>
  );
}

function NavLink({to, label, className = ''}: {to: string; label: string; className?: string}) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-11 items-center rounded-full px-3 text-[0.9375rem] font-medium text-ink-600 transition-colors duration-200 hover:text-passport ${className}`}
    >
      {label}
    </Link>
  );
}
