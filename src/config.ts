/**
 * Everything you are likely to change lives here.
 *
 * Nothing else in the site hardcodes a link, an address or a file size — edit
 * this file, rebuild, redeploy.
 */

/** Where the Download button points. Google Drive share link to the APK. */
export const DOWNLOAD_LINK =
  'https://drive.google.com/file/d/1VmexzWhgc-yIWTtI5IbIp4kSILVo9DGa/view?usp=drive_link';

/** The single CTA label, reused everywhere. Change it once, it changes everywhere. */
export const CTA_LABEL = 'Download Roamlet';

/** Shown under every CTA. It is a Drive file, not a store listing — say so. */
export const APK_SIZE = '[APK size — e.g. 52 MB]';
export const MIN_ANDROID = '[minimum Android version — e.g. Android 8.0+]';

export const APP_NAME = 'Roamlet';
export const APP_TAGLINE = 'A travel guide that works with the radio off.';

/**
 * Public contact address. This is prefilled with the address on this machine —
 * swap it for whatever you actually want strangers emailing.
 */
export const CONTACT_EMAIL = 'prot.das15@gmail.com';

export const DEVELOPER = {
  name: 'Proteen Das',
  role: 'Designer & Developer, Roamlet',
  location: '[Bengaluru, India]',
  bio: 'Roamlet is a solo project: the app, the design system, the city-pack format and the content pipeline. It exists because every travel app I owned stopped working at the moment I actually needed it.',
  links: [
    {label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`},
    {label: 'GitHub', value: '[github.com/proteendas]', href: 'https://github.com/proteendas/'},
    {label: 'LinkedIn', value: '[linkedin.com/in/proteen]', href: 'https://www.linkedin.com/in/proteen/'},
  ],
} as const;
