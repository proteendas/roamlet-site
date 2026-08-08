import {motion} from 'framer-motion';

import {APK_SIZE, CTA_LABEL, DOWNLOAD_LINK, MIN_ANDROID} from '../config';

/**
 * The only call to action on the site.
 *
 * There is exactly one design and one label, reused in the hero, mid-page and
 * footer. Competing buttons are how a landing page ends up converting on none
 * of them, so secondary links elsewhere are deliberately plain text.
 *
 * It is an anchor, not a form: the destination is a Google Drive file, opened
 * in a new tab so leaving the page does not lose the reader's place.
 */
export function DownloadButton({
  size = 'lg',
  className = '',
}: {
  size?: 'lg' | 'md';
  className?: string;
}) {
  const pad = size === 'lg' ? 'px-9 py-4.5 text-[1.0625rem]' : 'px-6 py-3 text-[0.9375rem]';

  return (
    <motion.a
      href={DOWNLOAD_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex min-h-11 items-center gap-3 rounded-full bg-passport font-semibold text-paper-50 shadow-[0_10px_28px_-14px_rgba(30,50,48,0.85)] ${pad} ${className}`}
      whileHover={{scale: 1.025, backgroundColor: '#1E3230'}}
      whileTap={{scale: 0.975}}
      transition={{duration: 0.18, ease: 'easeOut'}}
    >
      <DownloadGlyph />
      {CTA_LABEL}
    </motion.a>
  );
}

/**
 * The honesty note under the button. This is a Drive link, not a store
 * listing — a reader who expects Play and gets an "unknown sources" prompt has
 * been surprised, and surprise is what loses the install.
 */
export function DownloadNote({className = ''}: {className?: string}) {
  return (
    <p className={`text-[0.8125rem] text-ink-500 ${className}`}>
      Direct download · Android APK · {APK_SIZE} · {MIN_ANDROID}
    </p>
  );
}

function DownloadGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-y-0.5"
    >
      <path
        d="M8 1.5v9m0 0 3.25-3.25M8 10.5 4.75 7.25M2 12v1.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
