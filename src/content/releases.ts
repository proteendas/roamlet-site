/**
 * What's new.
 *
 * Written from the app's actual commit history, in user-facing language.
 * Version numbers and dates are marked where they are placeholders — set them
 * to whatever you tag the build you upload to Drive.
 */
export interface Release {
  version: string;
  date: string;
  /** Optional one-line framing for the release as a whole. */
  summary?: string;
  added?: string[];
  improved?: string[];
  fixed?: string[];
}

export const RELEASES: Release[] = [
  {
    version: '0.1.0',
    date: '[release date]',
    summary:
      'The first build you can install. Everything below already works offline once a city and a model are on the device.',
    added: [
      'Chat history — every answer from Explore, Phrasebook, Food, Culture and Plan is saved on the device, grouped into conversations, with follow-up questions and one-tap delete.',
      'A clock button beside Settings opens that history, and a question asked from a city pack continues the same conversation instead of starting a new one.',
      'General-knowledge fallback — when a question falls outside the downloaded pack, Roamlet says so and then answers from the model’s own knowledge, clearly labelled.',
      'Search the city catalogue by city or country name, accent- and case-insensitively.',
      'A profile button on the home screen, with account settings moved out of the Settings tab and into it.',
      'Pinch-to-zoom and pan on the offline map, with zoom controls and the compass moved clear of the detail card.',
      'Tap any place on the map for its detail card — description, visit time, admission, accessibility, coordinates — and step through neighbouring places with arrows.',
      '“Directions” hands off to Google Maps from your current location, for the turn-by-turn Roamlet deliberately does not attempt offline.',
      'Cloud AI fallback for travellers who are online but have not downloaded a model yet — rate-limited per account, and skipped entirely when a local model is present.',
      'Legal screens, and a redesigned account screen for name, phone and password.',
    ],
    improved: [
      'Model downloads no longer trust any size published in the app. The real size is fetched from the server at download time, and the downloaded file must begin with the GGUF magic bytes before it is accepted — so a model that is re-quantised, moved or gated upstream fails honestly instead of silently.',
      'Downloads that the server will not report a size for now complete rather than being rejected.',
      'Failed downloads explain themselves: a gated model says it needs a licence accepted, a moved model says it was moved, and neither retries pointlessly.',
      'Provider credentials for the cloud fallback are encrypted at rest and fetched as config, so rotating a key never needs an app release.',
      'Padding and spacing reworked across Settings, AI models and Account; the model info sheet scrolls properly.',
      'Sign in with Google removed entirely — email and password only.',
    ],
    fixed: [
      'Models that downloaded fully and were then deleted as “the wrong size”, caused by an estimated size in the app being a few percent off the real file.',
      'Cloud AI reporting “credits used up” while credits remained — a quota write that failed on a fresh account was being reported as an exhausted quota.',
      'Answers from the Phrasebook tab that were generated but never displayed anywhere.',
      'The app hanging on “Opening your passport” the first time a new account signed in.',
      'Account details showing empty after signing out and back in, until the app was restarted.',
      'Full name and phone number not saving, with the Save button spinning indefinitely.',
      'Download progress corrupting when a download was paused on a server that ignores range requests.',
      'A second tap on Download being shown as a failure rather than ignored.',
    ],
  },
];

/** Shown at the top of the What's new page. */
export const ROADMAP: string[] = [
  'Offline map tiles — the download and verification pipeline is built; unpacking the archive needs a native module.',
  'Background downloads that survive the app being backgrounded on Android.',
  'Drag-and-drop reordering on the plan board.',
  'Token-by-token streaming for cloud fallback answers, matching the on-device experience.',
  'More cities. [Tell me which one you want next.]',
];
