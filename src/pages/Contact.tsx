import {Link} from 'react-router-dom';

import {AppIcon} from '../components/Brand';
import {DownloadButton, DownloadNote} from '../components/DownloadButton';
import {Reveal} from '../components/motion';
import {CONTACT_EMAIL, DEVELOPER} from '../config';
import {FAQS, type Faq} from '../content/faqs';

/**
 * Contact.
 *
 * No form. A form on a static site needs a backend or a third party, and both
 * are worse than a mailto for a project with one developer reading the replies.
 */
export function Contact() {
  return (
    <main className="px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow text-stamp">Contact</p>
          <h1 className="display mt-5 max-w-[16ch] text-[2.5rem] text-ink sm:text-[3.5rem]">
            One person builds this.
          </h1>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 flex flex-col gap-6 border-t border-paper-300 pt-10 sm:flex-row sm:gap-8">
            <AppIcon size={72} className="shrink-0 rounded-2xl shadow-[0_12px_28px_-16px_rgba(34,32,28,0.8)]" />
            <div>
              <h2 className="text-[1.375rem] font-bold tracking-[-0.02em] text-ink">
                {DEVELOPER.name}
              </h2>
              <p className="mt-1 text-[0.9375rem] text-ink-500">{DEVELOPER.role}</p>
              <p className="mt-1 text-[0.9375rem] text-ink-500">{DEVELOPER.location}</p>
              <p className="mt-5 max-w-[52ch] text-[1rem] leading-relaxed text-ink-600">
                {DEVELOPER.bio}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-paper-300 bg-paper-300 sm:grid-cols-3">
            {DEVELOPER.links.map(link => (
              <div key={link.label} className="bg-paper-50 px-5 py-5">
                <dt className="eyebrow text-ink-400">{link.label}</dt>
                <dd className="mt-2 break-words text-[0.9375rem] font-medium">
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="text-passport underline decoration-passport/30 underline-offset-4 transition-colors hover:decoration-passport"
                  >
                    {link.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.12}>
          <section id="faq" className="mt-20 border-t border-paper-300 pt-12">
            <h2 className="display text-[1.75rem] text-ink sm:text-[2.25rem]">
              Questions people ask.
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-ink-600">
              If yours is not here, it belongs in the section below.
            </p>
            <div className="mt-8">
              {FAQS.map(faq => (
                <FaqItem key={faq.q} faq={faq} />
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.14}>
          <section className="mt-20 border-t border-paper-300 pt-12">
            <h2 className="display text-[1.75rem] text-ink sm:text-[2.25rem]">What to write about.</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
              <Topic
                title="Something is broken"
                body="Tell me the phone, the Android version and what you were doing. A screenshot beats a description."
                action="Report a bug"
              />
              <Topic
                title="Request a city"
                body="Packs are hand-authored, so the list grows by request. Say which city and roughly when you are going."
                action="Request a city"
              />
              <Topic
                title="A pack got something wrong"
                body="Opening hours go stale and etiquette varies. Point at the specific line and I will correct the pack."
                action="Report pack content"
              />
              <Topic
                title="Anything else"
                body="Questions about how the on-device model works, the pack format, or the project generally."
                action="Say hello"
              />
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.18}>
          <section className="mt-20 border-t border-paper-300 pt-12">
            <h2 className="display text-[1.75rem] text-ink sm:text-[2.25rem]">Privacy, briefly.</h2>
            <p className="mt-5 max-w-[54ch] text-[1rem] leading-relaxed text-ink-600">
              Questions you ask the app are answered on your device and stored only on your device.
              Chat history can be deleted at any time from inside the app. The only network calls
              Roamlet makes are downloading a city or a model, signing in, and &mdash; for
              travellers who have not downloaded a model yet &mdash; a rate-limited cloud fallback
              that is skipped entirely once a local model is installed.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] font-medium">
              <Link to="/privacy" className="text-passport transition-opacity hover:opacity-70">
                Privacy Policy &rarr;
              </Link>
              <Link to="/terms" className="text-passport transition-opacity hover:opacity-70">
                Terms of Use &rarr;
              </Link>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.22}>
          <section className="mt-20 flex flex-col items-start gap-3 border-t border-paper-300 pt-12">
            <DownloadButton />
            <DownloadNote />
          </section>
        </Reveal>
      </div>
    </main>
  );
}

/**
 * Native `<details>` rather than state and AnimatePresence: it is keyboard
 * accessible and findable by the browser's own in-page search for free, and
 * Ctrl-F failing to find an answer that is on the page is a worse bug than a
 * missing open/close transition.
 */
function FaqItem({faq}: {faq: Faq}) {
  return (
    <details className="group border-t border-paper-300 last:border-b">
      <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
        <h3 className="flex-1 text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-passport">
          {faq.q}
        </h3>
        <span
          aria-hidden="true"
          className="mt-1 shrink-0 text-ink-400 transition-transform duration-300 group-open:rotate-45"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </summary>
      <p className="max-w-[58ch] pb-6 text-[0.9375rem] leading-relaxed text-ink-600 sm:text-[1rem]">
        {faq.a}
      </p>
    </details>
  );
}

function Topic({title, body, action}: {title: string; body: string; action: string}) {
  return (
    <div className="border-t border-paper-400 pt-5">
      <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">{title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{body}</p>
      <a
        href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Roamlet — ${action}`)}`}
        className="mt-3 inline-flex min-h-11 items-center text-[0.9375rem] font-semibold text-passport transition-opacity hover:opacity-70"
      >
        {action} &rarr;
      </a>
    </div>
  );
}
