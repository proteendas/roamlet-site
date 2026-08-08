/**
 * FAQs.
 *
 * Every answer here is checked against what the app actually does — the daily
 * credit figure, the model sizes, the account requirement and the offline
 * boundaries all match the Terms and the Privacy Policy. If you change one,
 * change the other, or the FAQ quietly becomes the thing people trust.
 */
export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'Does it really work with no signal at all?',
    a: 'Yes, once a city pack and an AI model are on the phone. Reading a pack, asking the on-device AI, the map, the phrasebook and the emergency screens all work in airplane mode. Three things need a connection, and only those three: downloading a city, downloading a model, and signing in.',
  },
  {
    q: 'Do I have to download an AI model?',
    a: 'No, but it is the point of the app. Without one, Roamlet can still answer while you are online using a shared cloud service, limited to 20 questions per rolling 24 hours per account. Downloading a model removes that limit completely and keeps every question on your device. If a local model is installed, the cloud path is never used.',
  },
  {
    q: 'How much storage does it need?',
    a: 'City packs are a few megabytes each. Models are the large part: roughly 470 MB for the smallest, up to about 2.3 GB for the largest, and you choose which one. Downloads are resumable across app restarts, so a force-quit part-way through does not cost you the whole file, and Roamlet always asks before starting a large download on mobile data.',
  },
  {
    q: 'Which phone do I need?',
    a: 'Roamlet installs on Android 7.0 and later, but the AI is what sets the real bar: you want a 64-bit phone with at least 3 GB of RAM, which comfortably runs the smallest model. Larger ones need more — roughly 4 GB of RAM for Qwen 1.5B, 6 GB for Gemma 2 2B and 8 GB for Phi-3.5 Mini. Roamlet checks your device before any download and warns you, or refuses outright, rather than letting you spend two gigabytes on a model your phone cannot load. Everything that is not AI — packs, the map, the phrasebook, emergency info — runs on far less. Expect 15 to 30 seconds for a paragraph on a cheap phone with the smallest model; a recent phone is considerably faster.',
  },
  {
    q: 'Why is it not on the Play Store?',
    a: 'It is a solo project and currently distributed as a direct APK download. You will need to allow installation from unknown sources once, which Android will prompt you for.',
  },
  {
    q: 'Is there an iPhone version?',
    a: 'The app is built from one codebase that targets both iOS and Android, but only the Android build is distributed right now, because a direct download is not possible on iOS. The iOS build is ready to go, but I am waiting for a way to distribute it after I get a developer account in the App Store.',
  },
  {
    q: 'Are my questions private?',
    a: 'When you use a downloaded model, your questions and their answers are processed entirely on your phone and are never sent anywhere. There is no record of them outside your device, and chat history can be deleted at any time from inside the app. The exceptions are account data, which goes to Firebase, and cloud fallback questions if you have not downloaded a model — both covered in the Privacy Policy.',
  },
  {
    q: 'Why does it need an account at all?',
    a: 'To apply the daily cloud AI limit fairly and stop the shared free service being abused, and to keep your saved cities and plans tied to you. It does not gate the offline features behind a check at the moment you need them.',
  },
  {
    q: 'Can it give me turn-by-turn directions?',
    a: 'Not offline, and it does not pretend to. The offline map draws every place the pack knows at its true relative position, which answers what is near me and in which direction. For actual navigation, tapping Directions hands off to Google Maps, which needs a connection. Routing is a job for an app with a live network and a routing engine.',
  },
  {
    q: 'Which cities can I download?',
    a: 'Packs are hand-authored rather than scraped, so the catalogue grows deliberately rather than all at once. Open the Cities screen in the app for the current list, and email me if the one you are going to is missing — that is genuinely how the list gets longer.',
  },
  {
    q: 'What if an answer is wrong?',
    a: 'Treat it as a companion, not an authority. Answers are tied to the downloaded pack, and when a question falls outside it Roamlet says so before answering from the model’s general knowledge. Pack content carries a confidence marker, and low-confidence notes are hedged rather than dropped. Always verify anything safety-critical — emergency numbers, medical, visa and border rules, transit times — against an official source.',
  },
  {
    q: 'Does it cost anything?',
    a: 'No. There are no ads, no subscription and no payment of any kind.',
  },
];
