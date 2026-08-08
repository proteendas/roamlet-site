import {Link} from 'react-router-dom';

import {CONTACT_EMAIL} from '../config';
import {Wordmark} from './Brand';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-paper-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex flex-col gap-2">
          <Wordmark />
          <p className="text-[0.8125rem] text-ink-500">
            An offline travel companion. Built for people who travel without a data plan.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.875rem]">
          <Link to="/whats-new" className="text-ink-600 transition-colors hover:text-passport">
            What&rsquo;s new
          </Link>
          <Link to="/contact" className="text-ink-600 transition-colors hover:text-passport">
            Contact
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-ink-600 transition-colors hover:text-passport"
          >
            {CONTACT_EMAIL}
          </a>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
        <p className="text-[0.75rem] text-ink-400">
          &copy; {new Date().getFullYear()} Roamlet. Distributed as a direct APK download, not
          through an app store.
        </p>
      </div>
    </footer>
  );
}
