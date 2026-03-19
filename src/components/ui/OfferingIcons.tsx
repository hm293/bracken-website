const iconProps = {
  width: 48,
  height: 48,
  fill: 'none',
  stroke: '#9B8B7A',
  strokeWidth: 1.3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'mb-4',
}

export function CrystalBowlIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 36 36">
      <ellipse cx="18" cy="24" rx="13" ry="5" />
      <path d="M5 24c0-10 5.5-18 13-18s13 8 13 18" />
      <path d="M13 10c1.5 2 3 2.5 5 2.5s3.5-.5 5-2.5" opacity="0.4" />
    </svg>
  )
}

export function SoundWaveIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 36 36" strokeLinejoin={undefined}>
      <path d="M6 18c3-6 6-10 12-10" />
      <path d="M6 18c3 6 6 10 12 10" />
      <path d="M22 12c2 1.5 3 3.5 3 6s-1 4.5-3 6" opacity="0.6" />
      <path d="M26 9c3 2.5 4.5 5.5 4.5 9s-1.5 6.5-4.5 9" opacity="0.35" />
    </svg>
  )
}

export function CircleIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 36 36" strokeLinejoin={undefined}>
      <circle cx="18" cy="7" r="2.5" />
      <circle cx="28" cy="14" r="2.5" />
      <circle cx="26" cy="26" r="2.5" />
      <circle cx="10" cy="26" r="2.5" />
      <circle cx="8" cy="14" r="2.5" />
      <path d="M18 10c4 1 7 3 9.5 5.5" opacity="0.3" />
      <path d="M27 17c0 4-1 6.5-2 8" opacity="0.3" />
      <path d="M24.5 27.5c-3 1.5-7 2-11 0" opacity="0.3" />
      <path d="M9 25c-1-2-1.5-4.5-1-7.5" opacity="0.3" />
      <path d="M9 13c2-2 5-3.5 8-4.5" opacity="0.3" />
    </svg>
  )
}

export function FlameIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 36 36">
      <path d="M18 4c-1 5-6 8-6 14a6 6 0 0012 0c0-2-.5-3.5-2-5 .5 2 0 4-2 5.5-1-2-2-3-2-5.5-1 2-3 3.5-3 5.5a3 3 0 006 0" opacity="0.7" />
      <path d="M10 30c1 1.5 3 3 5 3.5" opacity="0.4" />
      <path d="M26 30c-1 1.5-3 3-5 3.5" opacity="0.4" />
      <path d="M7 30h22" />
    </svg>
  )
}

export function BrainIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 36 36">
      <path d="M12 16c-2-1-3-3-3-5.5 0-3 2-5.5 5-5.5 1 0 2 .3 2.5 1C17 4.5 18 4 19.5 4c3 0 5 2.5 5 5.5 0 2.5-1 4.5-3 5.5" />
      <path d="M12 16c-2 1-3 3-3 5s1 4 3 5" />
      <path d="M24 16c2 1 3 3 3 5s-1 4-3 5" />
      <path d="M12 26c2 1 4 1.5 6 1.5s4-.5 6-1.5" />
      <path d="M8 30c4-1 7-1 10-1s6 0 10 1" opacity="0.4" />
      <path d="M10 33c4-1 6-1 8-1s4 0 8 1" opacity="0.25" />
    </svg>
  )
}

export function LeafIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 36 36">
      <path d="M18 32V12" />
      <path d="M18 12c-2-4-7-7-13-8 1 6 4 10 8 12" opacity="0.7" />
      <path d="M18 12c2-4 7-7 13-8-1 6-4 10-8 12" opacity="0.7" />
      <path d="M18 18c-2-2-5-4-9-4.5 .5 3 2 5.5 5 6.5" opacity="0.5" />
      <path d="M18 18c2-2 5-4 9-4.5-.5 3-2 5.5-5 6.5" opacity="0.5" />
      <path d="M18 24c-1.5-1-3.5-2-6-2 .5 2 1.5 3.5 3.5 4" opacity="0.35" />
      <path d="M18 24c1.5-1 3.5-2 6-2-.5 2-1.5 3.5-3.5 4" opacity="0.35" />
    </svg>
  )
}

export function BowlMalletIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 36 36">
      <ellipse cx="16" cy="26" rx="11" ry="4.5" />
      <path d="M5 26c0-7 4-13 11-13s11 6 11 13" />
      <line x1="28" y1="8" x2="20" y2="20" />
      <circle cx="29" cy="7" r="2" fill="#9B8B7A" opacity="0.2" stroke="#9B8B7A" />
    </svg>
  )
}

export function SunIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 36 36">
      <circle cx="18" cy="16" r="6" />
      <line x1="18" y1="4" x2="18" y2="7" />
      <line x1="18" y1="25" x2="18" y2="28" />
      <line x1="7" y1="16" x2="10" y2="16" />
      <line x1="26" y1="16" x2="29" y2="16" />
      <line x1="10.2" y1="8.2" x2="12.3" y2="10.3" opacity="0.6" />
      <line x1="23.7" y1="21.7" x2="25.8" y2="23.8" opacity="0.6" />
      <line x1="25.8" y1="8.2" x2="23.7" y2="10.3" opacity="0.6" />
      <line x1="12.3" y1="21.7" x2="10.2" y2="23.8" opacity="0.6" />
      <path d="M12 32h12" opacity="0.4" />
    </svg>
  )
}

export function MoonIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 36 36">
      <path d="M24 6c-8 0-14 6-14 14s6 14 14 14c-10 0-18-6.3-18-14S14 6 24 6z" />
      <circle cx="22" cy="8" r="0.8" fill="#9B8B7A" opacity="0.4" />
      <circle cx="28" cy="12" r="0.6" fill="#9B8B7A" opacity="0.3" />
      <circle cx="26" cy="17" r="0.5" fill="#9B8B7A" opacity="0.25" />
      <circle cx="30" cy="8" r="0.7" fill="#9B8B7A" opacity="0.2" />
    </svg>
  )
}

const iconMap: Record<string, React.FC> = {
  'crystal-bowl': CrystalBowlIcon,
  'sound-wave': SoundWaveIcon,
  circle: CircleIcon,
  flame: FlameIcon,
  brain: BrainIcon,
  leaf: LeafIcon,
  'bowl-mallet': BowlMalletIcon,
  sun: SunIcon,
  moon: MoonIcon,
}

export function OfferingIcon({ icon }: { icon: string }) {
  const Icon = iconMap[icon]
  return Icon ? <Icon /> : null
}
