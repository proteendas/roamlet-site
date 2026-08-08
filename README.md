# Roamlet — marketing site

The landing page for [Roamlet](../travel-companion), the offline travel companion.

This is a **completely standalone project**. It has its own `package.json` and its own
`node_modules`, imports nothing from the app codebase, and can be deployed, versioned or deleted
without touching the app. The only thing it shares with the app is its colour palette and icon
artwork, which were copied in — not imported.

**Stack:** Vite 6 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion 12 · React Router 7.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # type-checks, then writes dist/
npm run preview    # serves dist/ locally to check the production build
npm run typecheck  # types only, no build
```

---

## The one file you will actually edit

**[`src/config.ts`](src/config.ts)** holds everything likely to change:

| Constant | What it does |
|---|---|
| `DOWNLOAD_LINK` | Where every Download button points. Currently the Google Drive share link. |
| `CTA_LABEL` | The button text. Change it once, it changes in all four places. |
| `APK_SIZE`, `MIN_ANDROID` | The note under every button. **Both are placeholders — fill them in.** |
| `CONTACT_EMAIL` | Used in the footer, the contact page and every `mailto:` on it. |
| `DEVELOPER` | Name, role, location, bio and the three links on the contact page. |

> **`CONTACT_EMAIL` is prefilled with the address configured on the machine that generated this
> site** (`prot.das15@gmail.com`). It is a work address and it will be public. Change it
> before you deploy if that is not what you want.

Content lives in two more files, kept separate from layout so you can edit copy without reading JSX:

- **[`src/content/features.ts`](src/content/features.ts)** — the six scroll-told feature beats, the
  "also inside" grid, and the four trust stats.
- **[`src/content/releases.ts`](src/content/releases.ts)** — the What's new page. Add a new object to
  the front of `RELEASES` for each build you ship.

---

## Placeholders still to fill

Everything needing your input is wrapped in `[square brackets]` so it is greppable:

```bash
grep -rn "\[" src/config.ts src/content/ src/pages/ | grep -v "\[\]" | grep "\["
```

At the time of writing that is:

1. `APK_SIZE` and `MIN_ANDROID` in `src/config.ts` — the file size and minimum Android version.
2. `DEVELOPER.location`, GitHub and LinkedIn URLs in `src/config.ts`.
3. `RELEASES[0].date` in `src/content/releases.ts` — the release date for v0.1.0.
4. The last roadmap line in `releases.ts`.
5. The social-proof note in `src/pages/Home.tsx` (`Trust` section) — install numbers or testimonials,
   **once you have real ones**. It is deliberately empty rather than invented.
6. The privacy-policy link on `src/pages/Contact.tsx`.

---

## Screenshots

The three phones in the "In the hand" section are **not photographs** — they are the app's screens
rebuilt in HTML from Roamlet's own design tokens, at the real 9:19.5 aspect ratio, in
[`src/components/PhoneMock.tsx`](src/components/PhoneMock.tsx). That keeps the page self-contained
and lets it stay sharp at any resolution.

To swap in real captures instead:

1. Drop the PNGs in `public/screens/`.
2. In `src/pages/Home.tsx`, replace `<ShelfScreen />` / `<AskScreen />` / `<MapScreen />` inside each
   `<PhoneFrame>` with `<img src="/screens/shelf.png" alt="…" className="h-full w-full object-cover" />`.

`PhoneFrame` keeps the bezel, the notch and the caption either way.

---

## Design notes

The look follows [illoca.com](https://illoca.com)'s structure and motion, using Roamlet's own
material:

- **Typography-led.** No stock photography anywhere. The hero is one headline at 40px on mobile and
  88px on desktop, and the page is built from type, whitespace and hairline rules.
- **One base, one accent.** Warm paper `#F5EFE3` and ink `#22201C` as the base; passport green
  `#2E4A46` as the single accent, on every button, rule and marker. Stamp red `#B5453C` is rationed
  to the section numerals only, so it reads as a mark rather than a second brand colour. All lifted
  verbatim from the app's `src/design/theme/palette.ts`.
- **Sequential storytelling.** Six numbered beats reveal one at a time on scroll, with a slow
  counter-drift on the numerals.
- **A letter, not a pitch.** The mid-page section is set in Georgia at a narrow measure, because it
  is someone talking rather than a product describing itself.
- **No external requests.** No web fonts, no CDN, no analytics. The icon is inline SVG. The page
  works with the network cut after first load — which felt like the right thing for this app.

**Motion policy** lives in [`src/components/motion.tsx`](src/components/motion.tsx). Two things
suppress it: the OS `prefers-reduced-motion` setting, and a viewport under 1024px. The second is not
taste — scroll-linked parallax is where a landing page starts dropping frames on a phone GPU. Under
either condition, sections still fade in; only the parallax and the scroll-linked hero are dropped.

**Responsive breakpoints:** single column under 640px, two-column grids from 640px, the full
scroll-animation experience and side-by-side layouts from 1024px. The hero is padded so that the
headline, subtext and Download button all clear the fold at 375×667 as well as at 1440×900.

**Navigation** switches at 768px ([`src/components/Nav.tsx`](src/components/Nav.tsx), `DESKTOP_QUERY`).
Above it, the links and the CTA sit inline in the bar. Below it they collapse into a hamburger that
opens a full-height paper panel — three text links and a button will not fit a 375px bar without
every one of them losing its tap target, and the panel lets the menu use the same oversized type as
the rest of the page instead of shrinking to fit a strip. The panel locks the page behind it, closes
on Escape, on any navigation, and on a resize past the breakpoint, and the two-bar icon crosses into
an X. Add a link by appending to the `LINKS` array — desktop and mobile both read from it.

---

## The CTA

One design, one label, four placements — the nav bar (inline on desktop, at the foot of the
hamburger panel on mobile), the hero, mid-page, and above the footer. It is an `<a href>` with
`target="_blank" rel="noopener noreferrer"`, not a form, and the tap target is 44px minimum. Every instance carries the same note underneath saying it is a direct APK download
rather than a store listing, because a reader who expects Play and gets an "unknown sources" prompt
has been surprised, and surprise is what loses the install.

If you add another button anywhere, use `<DownloadButton />` — do not write a second one.

---

## Deploy

The build is a static `dist/`. Because the site uses real routes (`/whats-new`, `/contact`) rather
than hash routes, the host must rewrite unknown paths to `index.html` — otherwise a direct link or a
refresh on those pages 404s. Config for the two common hosts is already committed.

**Netlify** — build `npm run build`, publish `dist`. [`public/_redirects`](public/_redirects) is
picked up automatically.

**Vercel** — build `npm run build`, output `dist`. [`vercel.json`](vercel.json) provides the rewrite.

**Cloudflare Pages** — build `npm run build`, output `dist`. Add a `_redirects` equivalent or enable
SPA mode.

**GitHub Pages** — needs one extra step, since Pages cannot rewrite. After building, copy the entry
point to a 404 handler:

```bash
npm run build && cp dist/index.html dist/404.html
```

**Any static host / S3** — upload `dist/`, and point the 404 handler at `index.html`.

---

## What is intentionally not here

- **No analytics or tracking.** Add it if you want it; nothing depends on it.
- **No contact form.** A form on a static site needs a backend or a third party. For a project with
  one developer reading the replies, `mailto:` is better than both.
- **No testimonials or install counts.** The trust section uses facts from the build instead. Add
  real ones when you have them; the placeholder marks the spot.
