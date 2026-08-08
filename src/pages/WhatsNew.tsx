import {DownloadButton, DownloadNote} from '../components/DownloadButton';
import {Reveal} from '../components/motion';
import {RELEASES, ROADMAP, type Release} from '../content/releases';

/**
 * What's new.
 *
 * A quiet, typographic changelog — same page furniture as the landing page,
 * none of its motion. People come here to read a list, not to be sold to
 * again; the CTA appears once, at the bottom.
 */
export function WhatsNew() {
  return (
    <main className="px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow text-stamp">Release notes</p>
          <h1 className="display mt-5 text-[2.5rem] text-ink sm:text-[3.5rem]">What&rsquo;s new.</h1>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-600">
            Everything that has changed in Roamlet, newest first. Written for people who use the
            app, not for people who wrote it.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20">
          {RELEASES.map((release, i) => (
            <ReleaseBlock key={release.version} release={release} delay={i * 0.05} />
          ))}
        </div>

        <Reveal>
          <section className="mt-24 border-t border-paper-300 pt-12">
            <p className="eyebrow text-ink-500">Next</p>
            <h2 className="display mt-4 text-[1.75rem] text-ink sm:text-[2.25rem]">
              What I&rsquo;m working on.
            </h2>
            <ul className="mt-8 flex flex-col gap-4">
              {ROADMAP.map(item => (
                <li key={item} className="flex gap-3.5">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                  <span className="text-[1rem] leading-relaxed text-ink-600">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-24 flex flex-col items-start gap-3 border-t border-paper-300 pt-12">
            <p className="mb-3 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-600">
              All of the above is in the current build.
            </p>
            <DownloadButton />
            <DownloadNote />
          </section>
        </Reveal>
      </div>
    </main>
  );
}

function ReleaseBlock({release, delay}: {release: Release; delay: number}) {
  return (
    <Reveal delay={delay}>
      <article>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2 className="display text-[1.75rem] text-ink sm:text-[2.25rem]">v{release.version}</h2>
          <span className="text-[0.875rem] font-medium text-ink-400">{release.date}</span>
        </div>

        {release.summary && (
          <p className="mt-4 max-w-[54ch] text-[1rem] leading-relaxed text-ink-600">
            {release.summary}
          </p>
        )}

        <ChangeList label="New" items={release.added} tone="passport" />
        <ChangeList label="Improved" items={release.improved} tone="brass" />
        <ChangeList label="Fixed" items={release.fixed} tone="stamp" />
      </article>
    </Reveal>
  );
}

const TONES = {
  passport: 'bg-passport/10 text-passport',
  brass: 'bg-brass/20 text-[#8A5F26]',
  stamp: 'bg-stamp/10 text-stamp',
} as const;

function ChangeList({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[] | undefined;
  tone: keyof typeof TONES;
}) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <section className="mt-10">
      <span className={`eyebrow inline-block rounded-full px-2.5 py-1 ${TONES[tone]}`}>{label}</span>
      <ul className="mt-5 flex flex-col gap-3.5">
        {items.map(item => (
          <li key={item} className="flex gap-3.5">
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-paper-400" />
            <span className="text-[0.9375rem] leading-relaxed text-ink-700 sm:text-[1rem]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
