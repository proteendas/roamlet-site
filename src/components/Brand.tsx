/**
 * The app icon, redrawn from `assets/brand/roamlet-icon.svg` in the app repo:
 * a passport cover with a brass compass needle that doubles as a paper plane,
 * and a stamp in the corner. Inline rather than an <img> so it stays crisp and
 * can be scaled anywhere without a second network request.
 */
export function AppIcon({size = 64, className = ''}: {size?: number; className?: string}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Roamlet app icon"
    >
      <defs>
        <linearGradient id="rl-bg" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#FBF7EF" />
          <stop offset="1" stopColor="#EDE5D6" />
        </linearGradient>
        <linearGradient id="rl-cover" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#2E4A46" />
          <stop offset="1" stopColor="#1E3230" />
        </linearGradient>
        <linearGradient id="rl-brass" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#DCAE72" />
          <stop offset="1" stopColor="#C08A4A" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="14" fill="url(#rl-bg)" />

      <g transform="translate(2 1) scale(0.94)">
        <rect x="14" y="9" width="38" height="46" rx="5" fill="#FBF7EF" opacity="0.55" />
        <rect x="12.5" y="7.5" width="38" height="46" rx="5" fill="#FBF7EF" opacity="0.8" />

        <g transform="rotate(-4 32 32)">
          <rect x="9" y="6" width="40" height="48" rx="6" fill="url(#rl-cover)" />
          <circle cx="29" cy="26" r="12.5" fill="none" stroke="#C08A4A" strokeWidth="1.6" opacity="0.75" />
          <circle
            cx="29"
            cy="26"
            r="15.5"
            fill="none"
            stroke="#C08A4A"
            strokeWidth="0.9"
            strokeDasharray="2.2 2.6"
            opacity="0.5"
          />
          <path d="M29 15.5 L34.6 32.4 L29 29.1 L23.4 32.4 Z" fill="url(#rl-brass)" strokeLinejoin="round" />
          <path d="M29 29.1 L34.6 32.4 L29 36.5 L23.4 32.4 Z" fill="#FBF7EF" opacity="0.42" strokeLinejoin="round" />
          <rect x="17" y="45" width="18" height="2.4" rx="1.2" fill="#FBF7EF" opacity="0.72" />
          <rect x="17" y="49.5" width="11" height="2.4" rx="1.2" fill="#FBF7EF" opacity="0.5" />
        </g>

        <g transform="rotate(11 48 46)">
          <circle cx="48" cy="46" r="9.5" fill="#B5453C" opacity="0.92" />
          <circle cx="48" cy="46" r="7.2" fill="none" stroke="#FBF7EF" strokeWidth="1.1" opacity="0.85" />
          <path
            d="M48 41.6 l1.32 2.68 2.96.43-2.14 2.09.5 2.94L48 48.35l-2.64 1.39.5-2.94-2.14-2.09 2.96-.43z"
            fill="#FBF7EF"
          />
        </g>
      </g>
    </svg>
  );
}

export function Wordmark({className = ''}: {className?: string}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <AppIcon size={26} className="rounded-[7px]" />
      <span className="text-[1.0625rem] font-bold tracking-[-0.02em] text-ink">Roamlet</span>
    </span>
  );
}
