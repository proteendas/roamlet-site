import {useRef} from 'react';

import {AppIcon} from '../components/Brand';
import {DownloadButton, DownloadNote} from '../components/DownloadButton';
import {AskScreen, MapScreen, PhoneFrame, ShelfScreen} from '../components/PhoneMock';
import {Reveal, motion, useParallax, useRichMotion, useScroll, useTransform} from '../components/motion';
import {ALSO_INSIDE, BEATS, TRUST} from '../content/features';
import {APP_TAGLINE} from '../config';

/**
 * The whole pitch, on one scrollable page.
 *
 * Structure follows the reading order a stranger actually uses: what is this →
 * why does it exist → what does it do → what does it look like → why trust it →
 * get it. Anchor ids match the nav.
 */
export function Home() {
  return (
    <main>
      <Hero />
      <Letter />
      <Beats />
      <Screens />
      <Trust />
      <FinalCta />
    </main>
  );
}

/* ------------------------------------------------------------------- hero */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const rich = useRichMotion();
  const {scrollYProgress} = useScroll({target: ref, offset: ['start start', 'end start']});
  const y = useTransform(scrollYProgress, [0, 1], [0, rich ? 90 : 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, rich ? 0.15 : 1]);

  return (
    /**
     * Padding is deliberately tighter than it looks like it should be. At
     * 375x667 the icon, headline, subtext and button have to all clear the fold
     * together — a hero whose CTA needs a scroll is not a hero.
     */
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-20 pb-10 sm:px-8 sm:pt-24 sm:pb-16"
    >
      <motion.div style={{y, opacity}} className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
          className="flex items-center gap-3"
        >
          <AppIcon size={44} className="rounded-xl shadow-[0_8px_20px_-12px_rgba(34,32,28,0.8)]" />
          <span className="eyebrow text-ink-500">Roamlet · offline travel companion</span>
        </motion.div>

        <motion.h1
          initial={{opacity: 0, y: 22}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1]}}
          className="display mt-6 max-w-[16ch] text-[2.5rem] text-ink sm:mt-7 sm:text-[4rem] lg:text-[5.5rem]"
        >
          {APP_TAGLINE}
        </motion.h1>

        <motion.p
          initial={{opacity: 0, y: 18}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1]}}
          className="mt-5 max-w-[52ch] text-[1rem] leading-relaxed text-ink-600 sm:mt-6 sm:text-[1.1875rem]"
        >
          Download a city before you fly. Then ask it anything &mdash; landmarks, food, phrases,
          etiquette &mdash; answered by an AI running on your phone.
        </motion.p>

        <motion.div
          initial={{opacity: 0, y: 18}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1]}}
          className="mt-8 flex flex-col items-start gap-3 sm:mt-9"
        >
          <DownloadButton />
          <DownloadNote />
        </motion.div>
      </motion.div>

      <ScrollHint />
    </section>
  );
}

function ScrollHint() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{delay: 1.1, duration: 0.8}}
      className="pointer-events-none absolute inset-x-0 bottom-7 hidden justify-center lg:flex"
    >
      <motion.span
        animate={{y: [0, 7, 0]}}
        transition={{duration: 2.4, repeat: Infinity, ease: 'easeInOut'}}
        className="text-[0.6875rem] font-semibold tracking-[0.18em] text-ink-400 uppercase"
      >
        Scroll
      </motion.span>
    </motion.div>
  );
}

/* ----------------------------------------------------------------- letter */

/**
 * The one section written as a person talking, not a product describing itself.
 * Serif, narrow measure, no bullet points — it should read like something that
 * arrived rather than something that was published.
 */
function Letter() {
  const ref = useRef<HTMLElement>(null);
  const y = useParallax(ref, 30);

  return (
    <section
      ref={ref}
      id="story"
      className="relative border-t border-paper-300 px-5 py-24 sm:px-8 sm:py-32"
    >
      <motion.div style={{y}} className="mx-auto max-w-[46rem]">
        <Reveal>
          <p className="eyebrow text-stamp">A letter</p>
          <p className="mt-6 font-serif text-[1.375rem] leading-snug text-ink sm:text-[1.75rem]">
            To everyone tired of losing a city the moment they lose signal &mdash;
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-6 font-serif text-[1.0625rem] leading-[1.75] text-ink-700 sm:text-[1.1875rem]">
          <Reveal delay={0.05}>
            <p>
              Phone at four percent. No signal, or signal that costs more per megabyte than lunch.
              The guidebook back at the hotel. And somewhere behind you, a shrine you walked past
              twice because nothing told you it was there.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Every travel app assumes the one thing you don&rsquo;t have. Maps that need tiles.
              Translators that need a server. Assistants that need to send your question somewhere
              before they&rsquo;ll answer it. All excellent &mdash; right up until you land.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              Roamlet is built the other way round. You download a city while you still have wifi.
              After that the app never needs the network again: the guide is on your phone, the model
              runs on your phone, and your questions never leave it.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ink">
              It won&rsquo;t know everything. But it will tell you plainly when it doesn&rsquo;t
              &mdash; which, in a country where you can&rsquo;t check, is the only kind of answer
              worth having.
            </p>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ beats */

function Beats() {
  return (
    <section id="features" className="relative border-t border-paper-300 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="eyebrow text-ink-500">How it works</p>
          <h2 className="display mt-5 max-w-[18ch] text-[2rem] text-ink sm:text-[2.75rem] lg:text-[3.5rem]">
            Six things it does with the radio off.
          </h2>
        </Reveal>

        <ol className="mt-16 flex flex-col sm:mt-24">
          {BEATS.map((beat, i) => (
            <BeatRow key={beat.n} beat={beat} last={i === BEATS.length - 1} />
          ))}
        </ol>

        {/* Mid-page CTA: six beats in is where a convinced reader is ready. */}
        <Reveal>
          <div className="mt-16 flex flex-col items-start gap-3 border-t border-paper-300 pt-14">
            <p className="max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink-600">
              All of it works with the phone in airplane mode.
            </p>
            <DownloadButton className="mt-2" />
            <DownloadNote />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BeatRow({beat, last}: {beat: (typeof BEATS)[number]; last: boolean}) {
  const ref = useRef<HTMLLIElement>(null);
  const y = useParallax(ref, 22);

  return (
    <li
      ref={ref}
      className={`grid grid-cols-1 gap-4 py-10 sm:grid-cols-[7rem_1fr] sm:gap-10 sm:py-14 lg:grid-cols-[10rem_1fr] ${
        last ? '' : 'border-b border-paper-300'
      }`}
    >
      <Reveal>
        <motion.span
          style={{y}}
          className="display block text-[2.5rem] leading-none text-stamp/35 sm:text-[3.5rem] lg:text-[4.5rem]"
        >
          {beat.n}
        </motion.span>
      </Reveal>

      <div>
        <Reveal delay={0.06}>
          <h3 className="display max-w-[22ch] text-[1.375rem] text-ink sm:text-[1.75rem] lg:text-[2.125rem]">
            {beat.title}
          </h3>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-[54ch] text-[1rem] leading-relaxed text-ink-600 sm:text-[1.0625rem]">
            {beat.body}
          </p>
        </Reveal>
        {beat.note && (
          <Reveal delay={0.18}>
            <p className="mt-4 max-w-[54ch] border-l-2 border-brass/50 pl-4 text-[0.875rem] leading-relaxed text-ink-500">
              {beat.note}
            </p>
          </Reveal>
        )}
      </div>
    </li>
  );
}

/* ---------------------------------------------------------------- screens */

function Screens() {
  return (
    <section
      id="screens"
      className="relative overflow-hidden border-t border-paper-300 bg-paper-200/60 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow text-ink-500">In the hand</p>
          <h2 className="display mt-5 max-w-[20ch] text-[2rem] text-ink sm:text-[2.75rem] lg:text-[3.5rem]">
            Paper, ink and a brass compass.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-600">
            No pure white, no pure black, and no animation that doesn&rsquo;t mean something. Saving
            a place presses a stamp; the haptic fires at the moment of contact.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-wrap justify-center gap-10 sm:mt-20 sm:gap-12 lg:justify-between lg:gap-8">
          <Reveal delay={0}>
            <PhoneFrame label="Your shelf of downloaded cities">
              <ShelfScreen />
            </PhoneFrame>
          </Reveal>
          <Reveal delay={0.1}>
            <PhoneFrame label="Grounded answers, with sources named">
              <AskScreen />
            </PhoneFrame>
          </Reveal>
          <Reveal delay={0.2}>
            <PhoneFrame label="The map, with no map server">
              <MapScreen />
            </PhoneFrame>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-8 sm:mt-24 sm:grid-cols-2 lg:grid-cols-3">
          {ALSO_INSIDE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="border-t border-paper-400 pt-5">
                <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ trust */

function Trust() {
  return (
    <section className="relative border-t border-paper-300 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="eyebrow text-ink-500">Why download it</p>
          <h2 className="display mt-5 max-w-[20ch] text-[2rem] text-ink sm:text-[2.75rem] lg:text-[3.5rem]">
            Built for people who travel without a data plan.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {TRUST.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <p className="display text-[2rem] text-passport sm:text-[2.5rem]">{item.stat}</p>
              <p className="mt-2 text-[0.875rem] leading-snug text-ink-600">{item.label}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 max-w-[54ch] border-l-2 border-passport/40 pl-6">
            <p className="text-[1rem] leading-relaxed text-ink-600">
              Roamlet is a solo project, distributed as a direct APK rather than through a store.
              There are no ads, no analytics on what you ask, and no account needed to read a pack
              you have already downloaded.
            </p>
            {/* <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-500">
              [Add testimonials or install numbers here once you have real ones. Leaving this
              honest is worth more than inventing a review.]
            </p> */}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- final cta */

function FinalCta() {
  return (
    <section className="relative border-t border-paper-300 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <AppIcon size={56} className="rounded-2xl shadow-[0_14px_30px_-16px_rgba(34,32,28,0.8)]" />
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display mt-8 max-w-[18ch] text-[2rem] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
            Put the city on the phone before you get on the plane.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-600">
            One download now, and the guide keeps working when everything else stops.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <DownloadButton />
            <DownloadNote />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
