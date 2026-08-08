import type {ReactNode} from 'react';

/**
 * Device frames.
 *
 * The screens inside are rebuilt in HTML from Roamlet's own design tokens
 * rather than being photographs of the app. They are honest illustrations of
 * what each screen does, at the app's real proportions — swap in real captures
 * when you have them (see README, "Screenshots").
 */
export function PhoneFrame({
  children,
  label,
  className = '',
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <figure className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="relative w-[236px] shrink-0 rounded-[2.35rem] bg-ink p-[9px] shadow-[0_28px_60px_-30px_rgba(34,32,28,0.7)] sm:w-[262px]">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.85rem] bg-paper">
          {/* Status bar + notch, so the frame reads as a phone and not a card. */}
          <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center justify-between px-4">
            <span className="text-[9px] font-semibold text-ink-600">9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-ink-400" />
              <span className="text-[9px] font-semibold text-ink-600">Airplane mode</span>
            </span>
          </div>
          <div className="absolute left-1/2 top-1.5 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
          <div className="h-full overflow-hidden pt-7">{children}</div>
        </div>
      </div>
      <figcaption className="text-center text-[0.8125rem] font-medium text-ink-500">{label}</figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------- screens */

/** The shelf: downloaded cities as passport cards, tilted alternately by index. */
export function ShelfScreen() {
  const cities: Array<{city: string; country: string; cover: string; stamp: string}> = [
    {city: 'Kyoto', country: 'Japan', cover: '#2E4A46', stamp: '#B5453C'},
    {city: 'Lisbon', country: 'Portugal', cover: '#3C4E7A', stamp: '#C08A4A'},
    {city: 'Marrakesh', country: 'Morocco', cover: '#6B4A2F', stamp: '#7C9A6B'},
  ];

  return (
    <div className="flex h-full flex-col gap-3 px-4 pt-3">
      <p className="text-[8px] font-semibold tracking-[0.16em] text-ink-400 uppercase">Your passport</p>
      <h3 className="-mt-1 text-[19px] font-bold tracking-[-0.02em] text-ink">3 cities</h3>

      <div className="mt-1 flex flex-col gap-2.5">
        {cities.map((c, i) => (
          <div
            key={c.city}
            className="relative overflow-hidden rounded-lg px-3 py-3 shadow-[0_8px_18px_-12px_rgba(34,32,28,0.8)]"
            style={{
              backgroundColor: c.cover,
              transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)`,
            }}
          >
            {/* guilloché ring + foil rule, as on the real card */}
            <div
              className="pointer-events-none absolute -right-5 -top-6 h-20 w-20 rounded-full border opacity-40"
              style={{borderColor: '#C08A4A'}}
            />
            <p className="text-[13px] font-bold text-paper-50">{c.city}</p>
            <div className="my-1 h-px w-8" style={{backgroundColor: '#C08A4A'}} />
            <p className="text-[8.5px] text-paper-50/70">{c.country}</p>
            <div
              className="absolute right-2.5 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full opacity-90"
              style={{backgroundColor: c.stamp}}
            />
          </div>
        ))}
      </div>

      <div className="mt-auto mb-3 rounded-lg border border-dashed border-paper-400 px-3 py-2.5 text-center">
        <p className="text-[9px] font-semibold text-passport">+ Add a city</p>
      </div>
    </div>
  );
}

/** The answer: a grounded reply with its sources named. */
export function AskScreen() {
  return (
    <div className="flex h-full flex-col gap-2.5 px-4 pt-3">
      <p className="text-[8px] font-semibold tracking-[0.16em] text-ink-400 uppercase">Kyoto · offline</p>

      <div className="self-end rounded-xl rounded-br-sm bg-paper-200 px-3 py-2">
        <p className="text-[9.5px] leading-snug text-ink-700">
          Can I take photos inside Fushimi Inari?
        </p>
      </div>

      <div className="rounded-xl rounded-bl-sm border border-paper-300 bg-paper-50 px-3 py-2.5">
        <p className="text-[9.5px] leading-relaxed text-ink">
          Yes, along the torii paths and in the outer grounds. The pack notes that photography stops
          past the inner gate of the main hall, and that tripods are not allowed anywhere on the
          site.
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {['Fushimi Inari · etiquette', 'Shrine photography'].map(s => (
            <span
              key={s}
              className="rounded-full bg-passport/10 px-1.5 py-0.5 text-[7px] font-semibold text-passport"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="self-end rounded-xl rounded-br-sm bg-paper-200 px-3 py-2">
        <p className="text-[9.5px] leading-snug text-ink-700">What about drones?</p>
      </div>

      <div className="rounded-xl rounded-bl-sm border border-paper-300 bg-paper-50 px-3 py-2.5">
        <span className="mb-1.5 inline-block rounded-full bg-brass/20 px-1.5 py-0.5 text-[7px] font-semibold text-[#8A5F26]">
          Not in this pack
        </span>
        <p className="text-[9.5px] leading-relaxed text-ink">
          This city pack doesn&rsquo;t cover drones. Generally, Japanese shrines and dense urban
          areas prohibit them &mdash; check locally before flying.
        </p>
      </div>

      <div className="mt-auto mb-3 rounded-full border border-paper-300 bg-paper-50 px-3 py-2">
        <p className="text-[9px] text-ink-400">Ask about Kyoto&hellip;</p>
      </div>
    </div>
  );
}

/** The schematic map: no basemap, true relative positions. */
export function MapScreen() {
  const pins: Array<{x: number; y: number; kind: 'saved' | 'stop' | 'service'; label?: string}> = [
    {x: 30, y: 26, kind: 'stop', label: 'Kinkaku-ji'},
    {x: 62, y: 34, kind: 'saved'},
    {x: 48, y: 52, kind: 'stop'},
    {x: 74, y: 63, kind: 'saved', label: 'Gion'},
    {x: 22, y: 68, kind: 'service'},
    {x: 55, y: 80, kind: 'stop'},
  ];
  const colour = {saved: '#B5453C', stop: '#2E4A46', service: '#3C6E88'};

  return (
    <div className="relative h-full bg-paper-100">
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="mock-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0H0v10" fill="none" stroke="#D3C7B1" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#mock-grid)" />

        {/* day route between the plan stops */}
        <path
          d="M30 26 L48 52 L55 80"
          fill="none"
          stroke="#2E4A46"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          opacity="0.55"
        />

        {pins.map(p => (
          <g key={`${p.x}-${p.y}`}>
            <circle cx={p.x} cy={p.y} r="2.6" fill={colour[p.kind]} />
            <circle cx={p.x} cy={p.y} r="4.4" fill="none" stroke={colour[p.kind]} strokeWidth="0.4" opacity="0.4" />
            {p.label && (
              <text x={p.x + 6} y={p.y + 1.2} fontSize="3.2" fill="#4A463E" fontWeight="600">
                {p.label}
              </text>
            )}
          </g>
        ))}

        {/* compass, bottom right, as in the app */}
        <g transform="translate(88 84)" opacity="0.6">
          <circle r="5" fill="none" stroke="#7D766A" strokeWidth="0.4" />
          <path d="M0 -4 L1.6 0.8 L0 0 L-1.6 0.8 Z" fill="#B5453C" />
          <path d="M0 0 L1.6 0.8 L0 4 L-1.6 0.8 Z" fill="#7D766A" />
        </g>
      </svg>

      {/* filter chips */}
      <div className="absolute inset-x-0 top-2 flex gap-1 px-3">
        {['Everything', 'My stamps', 'My plan'].map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-2 py-1 text-[7.5px] font-semibold ${
              i === 0 ? 'bg-passport text-paper-50' : 'border border-paper-400 bg-paper-50 text-ink-600'
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      {/* tapped-pin detail card */}
      <div className="absolute inset-x-3 bottom-3 rounded-xl border border-paper-300 bg-paper-50 p-2.5 shadow-[0_10px_24px_-16px_rgba(34,32,28,0.9)]">
        <div className="flex items-center gap-1.5">
          <span className="text-[7px] text-ink-400">‹</span>
          <p className="flex-1 text-[10px] font-bold text-ink">Kinkaku-ji</p>
          <span className="text-[7px] text-ink-400">›</span>
        </div>
        <p className="mt-0.5 text-[7.5px] text-ink-400">金閣寺 · 2 of 6</p>
        <p className="mt-1 text-[8px] leading-snug text-ink-600">
          The Golden Pavilion. Busiest 10:00&ndash;14:00; the north path is quieter.
        </p>
        <div className="mt-1.5 flex gap-1">
          <span className="rounded-full bg-passport px-2 py-0.5 text-[7px] font-semibold text-paper-50">
            Directions
          </span>
          <span className="rounded-full border border-paper-400 px-2 py-0.5 text-[7px] font-semibold text-ink-600">
            Open in Maps
          </span>
        </div>
      </div>
    </div>
  );
}
