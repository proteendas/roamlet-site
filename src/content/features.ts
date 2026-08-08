/**
 * The scroll-told story: six beats, in the order a traveller meets them.
 *
 * One headline and one line each — deliberately. The moment a beat needs a
 * paragraph it stops being a beat and starts being documentation.
 */
export interface Beat {
  n: string;
  title: string;
  body: string;
  /** Small factual aside, rendered as a hairline note under the body. */
  note?: string;
}

export const BEATS: Beat[] = [
  {
    n: '01',
    title: 'Download the city while you still have wifi.',
    body: 'A pack is the whole city — landmarks, neighbourhoods, food, etiquette, phrases, transport, emergency numbers — in a few megabytes.',
    note: 'Every pack is SHA-256 checked and Ed25519 signed before it installs.',
  },
  {
    n: '02',
    title: 'Then ask it anything, with the radio off.',
    body: 'A language model runs on the phone itself. On the plane, in a tunnel, in a country where data costs more than lunch.',
    note: 'llama.cpp on-device. Your question is never uploaded, because there is nowhere to upload it to.',
  },
  {
    n: '03',
    title: 'It answers from the pack, or it tells you it can’t.',
    body: 'Every answer is tied to the city you downloaded. When the pack does not cover something, Roamlet says so plainly instead of inventing a plausible sentence.',
    note: 'That one constraint is what makes a small on-device model safe to act on abroad.',
  },
  {
    n: '04',
    title: 'A map that does not need a map server.',
    body: 'No basemap, no grey tiles waiting to load. Every place the pack knows, drawn at its true relative position, so you can see the shrine is south of the station.',
    note: 'Pinch to zoom, tap a pin for detail, hand off to Google Maps when you want turn-by-turn.',
  },
  {
    n: '05',
    title: 'Say it properly, not approximately.',
    body: 'Phrases are written by people, with polite and casual variants, transliteration and pronunciation. The model chooses between them — it never invents a sentence in a language you cannot check.',
    note: 'Copy, enlarge, or hold the screen up and let someone read it.',
  },
  {
    n: '06',
    title: 'And one screen that has to work first try.',
    body: 'Emergency numbers, embassies, hospitals and a script to read out loud — in large text, offline, on the worst day of the trip.',
    note: 'A pack cannot be published without at least one emergency number and one emergency phrase.',
  },
];

/** Secondary capabilities — a quiet grid, not another six beats. */
export const ALSO_INSIDE: Array<{title: string; body: string}> = [
  {
    title: 'Plan a day',
    body: 'Paced itineraries from the pack, rewritten on request — shorter, rainier, less walking.',
  },
  {
    title: 'Read a menu',
    body: 'A food glossary with dietary flags, where “unknown” means unknown rather than “no”.',
  },
  {
    title: 'Avoid the obvious mistake',
    body: 'Etiquette notes marked by confidence, so the app hedges where the author hedged.',
  },
  {
    title: 'Collect stamps',
    body: 'Save a place and it gets a stamp — the same frame every time, even after a reinstall.',
  },
  {
    title: 'Keep the thread',
    body: 'Chats are saved on the device, grouped by city, with follow-ups — and deletable at any time.',
  },
  {
    title: 'Pick your model',
    body: 'From a 470 MB model for old phones to 2.3 GB for a flagship. Resumable, pausable downloads.',
  },
];

/** The trust section. Facts from the build, not invented testimonials. */
export const TRUST: Array<{stat: string; label: string}> = [
  {stat: '0', label: 'bytes leave your phone when you ask a question'},
  {stat: '100%', label: 'of the guide works in airplane mode'},
  {stat: 'Ed25519', label: 'signature on every pack, checked before install'},
  {stat: '1', label: 'city pack ≈ a few megabytes on disk'},
];
