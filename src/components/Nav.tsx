import {useEffect, useState} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {Link, useLocation} from 'react-router-dom';

import {DownloadButton, DownloadNote} from './DownloadButton';
import {Wordmark} from './Brand';
import {useMediaQuery} from './motion';

/** Where the inline links give way to the hamburger. Kept in one place so the
 *  button, the panel and the resize guard can never disagree about it. */
const DESKTOP_QUERY = '(min-width: 768px)';

const LINKS: Array<{to: string; label: string}> = [
  {to: '/#features', label: 'Features'},
  {to: '/whats-new', label: "What's new"},
  {to: '/contact', label: 'Contact'},
];

/**
 * Minimal fixed nav. It starts transparent over the hero and only grows a
 * background once you have scrolled past it — the hero is the page's one piece
 * of uninterrupted whitespace and a bar sitting on it costs more than it gives.
 *
 * Under 768px the links collapse into a hamburger. Cramming three text links
 * and a CTA into a 375px bar leaves nothing with a real tap target, and the
 * full-height panel lets the menu use the same oversized type as the rest of
 * the page rather than shrinking to fit a strip.
 *
 * In-page anchors are written as `/#id` so they work from the What's new and
 * Contact routes too; `ScrollManager` in App.tsx handles the landing.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const {pathname, hash} = useLocation();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const onHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Navigating anywhere closes the menu. Each link also closes it on click,
  // which covers tapping the link you are already on — where neither the path
  // nor the hash changes and this effect would never fire.
  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  // Rotating to landscape or resizing past the breakpoint hides the panel via
  // CSS, which would otherwise leave the page scroll-locked by an invisible menu.
  useEffect(() => {
    if (isDesktop) {
      setOpen(false);
    }
  }, [isDesktop]);

  // Escape closes; the page behind must not scroll while the panel is over it.
  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const solid = scrolled || !onHome || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? `border-b border-paper-300 ${open ? 'bg-paper' : 'bg-paper/85 backdrop-blur-md'}`
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" aria-label="Roamlet home" className="shrink-0" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-2 md:flex">
          {LINKS.map(link => (
            <NavLink key={link.to} to={link.to} label={link.label} />
          ))}
          <DownloadButton size="md" className="ml-1" />
        </nav>

        <MenuButton open={open} onToggle={() => setOpen(value => !value)} />
      </div>

      <MobileMenu open={open} onNavigate={() => setOpen(false)} />
    </header>
  );
}

function NavLink({to, label}: {to: string; label: string}) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-11 items-center rounded-full px-3 text-[0.9375rem] font-medium text-ink-600 transition-colors duration-200 hover:text-passport"
    >
      {label}
    </Link>
  );
}

/**
 * Two rules that cross into an X. A three-line burger needs the middle bar to
 * fade out at exactly the right moment or the cross looks thick; two bars
 * reads as unambiguously as three and animates cleanly.
 */
function MenuButton({open, onToggle}: {open: boolean; onToggle: () => void}) {
  const reduced = useReducedMotion();
  const bar = 'block h-[1.75px] w-6 rounded-full bg-ink origin-center';
  const transition = {duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] as const};

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden"
    >
      <span className="flex flex-col items-center gap-[6px]">
        <motion.span
          className={bar}
          animate={open ? {rotate: 45, y: 3.875} : {rotate: 0, y: 0}}
          transition={transition}
        />
        <motion.span
          className={bar}
          animate={open ? {rotate: -45, y: -3.875} : {rotate: 0, y: 0}}
          transition={transition}
        />
      </span>
    </button>
  );
}

/**
 * The panel sits below the bar and fills the rest of the viewport, so the
 * hamburger stays visible and tappable to close. Opaque paper rather than a
 * blur: the type is large and the page behind it is busy.
 */
function MobileMenu({open, onNavigate}: {open: boolean; onNavigate: () => void}) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          key="mobile-menu"
          initial={reduced ? {opacity: 0} : {opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          exit={reduced ? {opacity: 0} : {opacity: 0, y: -10}}
          transition={{duration: 0.28, ease: [0.22, 1, 0.36, 1]}}
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-paper-300 bg-paper md:hidden"
        >
          <nav
            aria-label="Mobile"
            className="mx-auto flex min-h-full max-w-6xl flex-col px-5 pt-8 pb-10 sm:px-8"
          >
            <ul className="flex flex-col">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={reduced ? {opacity: 0} : {opacity: 0, y: 12}}
                  animate={{opacity: 1, y: 0}}
                  transition={{
                    duration: 0.4,
                    delay: reduced ? 0 : 0.06 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-paper-300"
                >
                  <Link
                    to={link.to}
                    onClick={onNavigate}
                    className="display flex min-h-11 items-center py-5 text-[2rem] text-ink transition-colors duration-200 active:text-passport"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={reduced ? {opacity: 0} : {opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.4, delay: reduced ? 0 : 0.26, ease: [0.22, 1, 0.36, 1]}}
              className="mt-auto flex flex-col items-start gap-3 pt-12"
            >
              <DownloadButton />
              <DownloadNote />
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
