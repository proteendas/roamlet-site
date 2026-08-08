import {Link} from 'react-router-dom';

import {Reveal} from '../components/motion';
import {CONTACT_EMAIL} from '../config';
import {LEGAL_LAST_UPDATED, PRIVACY, TERMS, type LegalDocument} from '../content/legal';

/**
 * Both legal documents share one shell.
 *
 * Deliberately the plainest pages on the site: no motion beyond the standard
 * fade, a narrow measure, and headings you can scan. Someone reading these is
 * looking for a specific clause, not being sold to.
 */
function LegalPage({doc, otherDoc}: {doc: LegalDocument; otherDoc: LegalDocument}) {
  return (
    <main className="px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <article className="mx-auto max-w-[46rem]">
        <Reveal>
          <p className="eyebrow text-stamp">Legal</p>
          <h1 className="display mt-5 text-[2.5rem] text-ink sm:text-[3.5rem]">{doc.title}</h1>
          <p className="mt-4 text-[0.875rem] text-ink-400">{LEGAL_LAST_UPDATED}</p>
          <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-600">
            {doc.standfirst}
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col">
          {doc.sections.map((section, i) => (
            <Reveal key={section.heading} delay={Math.min(i, 4) * 0.04}>
              <section className="border-t border-paper-300 py-9">
                <h2 className="text-[1.1875rem] font-bold tracking-[-0.015em] text-ink sm:text-[1.3125rem]">
                  {section.heading}
                </h2>
                <p className="mt-3 text-[1rem] leading-[1.75] text-ink-600 sm:text-[1.0625rem]">
                  {section.body}
                </p>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <section className="mt-6 border-t border-paper-300 pt-10">
            <h2 className="text-[1.1875rem] font-bold tracking-[-0.015em] text-ink">
              Questions about this document
            </h2>
            <p className="mt-3 max-w-[54ch] text-[1rem] leading-relaxed text-ink-600">
              Email{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  `Roamlet — ${doc.title}`,
                )}`}
                className="text-passport underline decoration-passport/30 underline-offset-4 transition-colors hover:decoration-passport"
              >
                {CONTACT_EMAIL}
              </a>
              . One person reads it.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] font-medium">
              <Link
                to={`/${otherDoc.slug}`}
                className="text-passport transition-opacity hover:opacity-70"
              >
                {otherDoc.title} &rarr;
              </Link>
              <Link to="/contact" className="text-ink-600 transition-colors hover:text-passport">
                Contact
              </Link>
            </div>
          </section>
        </Reveal>
      </article>
    </main>
  );
}

export function Terms() {
  return <LegalPage doc={TERMS} otherDoc={PRIVACY} />;
}

export function Privacy() {
  return <LegalPage doc={PRIVACY} otherDoc={TERMS} />;
}
