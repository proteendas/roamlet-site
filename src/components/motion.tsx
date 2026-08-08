import {type ReactNode, type RefObject, useEffect, useState} from 'react';
import {motion, useReducedMotion, useScroll, useTransform, type MotionValue} from 'framer-motion';

/**
 * Motion policy for the whole site, in one place.
 *
 * Two things suppress animation: the OS reduced-motion setting, and a narrow
 * viewport. The second is not a taste call — scroll-linked parallax on a phone
 * GPU is where a landing page starts dropping frames, and the content reads the
 * same without it.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = () => setMatches(list.matches);
    onChange();
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

/** True when we should render the full motion treatment. */
export function useRichMotion(): boolean {
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  return !reduced && desktop;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The one reveal used everywhere: fade up, once, when it comes into view.
 * Uniform easing and duration is what keeps a scroll feeling like one page
 * rather than a stack of separately-animated sections.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? {opacity: 0} : {opacity: 0, y}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.2, margin: '0px 0px -8% 0px'}}
      transition={{duration: 0.75, delay, ease: EASE}}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-linked vertical drift for an element, relative to its own passage
 * through the viewport. Returns a static 0 when rich motion is off, so callers
 * never need to branch.
 */
export function useParallax(
  target: RefObject<HTMLElement | null>,
  distance = 60,
): MotionValue<number> {
  const rich = useRichMotion();
  const {scrollYProgress} = useScroll({
    target,
    offset: ['start end', 'end start'],
  });
  return useTransform(scrollYProgress, [0, 1], rich ? [distance, -distance] : [0, 0]);
}

export {motion, useScroll, useTransform, useReducedMotion};
